import React, { useState, useEffect, useRef } from "react";
import Auth from "../components/Authentication";
import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";
import Input from "../components/Input";
import Map from "../components/Map";
import TextArea from "../components/TextArea";
import GoogleSearchBox from "../components/GoogleSearchBox";
import FileInput from "../components/FileInput";
import UserList from '../components/UserList';
import Select from "react-select";
import { 
	CancelToken, 
	getPlaceById, 
	getCategories, 
	createPlace, 
	editPlace, 
	getSignedRequestForPlaceImage, 
	uploadFile,
	getManagers,
	addUserAccess,
	removeUserAccess,
	createManagerUser
} from "../helpers/requestHelper";
import { withRouter, useParams, useHistory }  from "react-router-dom";

import styled from 'styled-components';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const SweetAlert = withReactContent(Swal);

const fontOptions = {
    fontSize: "13px",
    fontFamily: "'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif"
}

const ContainerSpan = styled.span`
	cursor: pointer;
	display: inline-block;
	overflow: hidden;
	position: relative;

	${({ position }) => (position ? "position:" + position + ";" : "")}
	${({ borderRadius }) => (borderRadius ? "border-radius:" + borderRadius + "px;" : "")}
	${({ pictureWidth }) => (pictureWidth ? "width:" + pictureWidth + ";" : "width: 115px;")}
	${({ pictureHeight }) => (pictureHeight ? "height:" + pictureHeight + "px;" : "height: 114px;")}
	${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + "px;" : "margin-top: 10px;")}
	${({ marginBottom }) => (marginBottom ? "margin-bottom:" + marginBottom + "px;" : "")}
	${({ marginLeft }) => (marginLeft ? "margin-left:" + marginLeft + "px;" : "")}
	${({ color }) => (color ? "color:" + color + ";" : "")}
`;

const customStyles = {
	singleValue: (provided, state) => ({
	    ...provided,
	    ...fontOptions,
	    paddingLeft: "6px",
	    color: "#616670"
	}),
	option: (provided, state) => ({
	    ...provided,
	    ...fontOptions,
	    color: !state.isSelected ? "#616670" : "#fff"
	}),
	input: (provided, state) => ({
	    ...provided,
	    ...fontOptions
	}),
  	control: (provided, state) => {
	    let { isFocused, isSelected } = state;

	    return {
		    ...provided,
		    ...fontOptions,
		    borderRadius: "0px",
		    boxShadow: "none",
		    borderColor: isFocused ? "#3c8dbc" : "#dbdbdb",
		    '&:hover': {
		        borderColor: isFocused ? "#3c8dbc" : "#dbdbdb",
		    }
	    }
  	},
  	placeholder: (provided, state) => {
	    return { 
	    	...provided, 
	    	fontStyle: "italic",
	        color: "#928f8f",
	        fontSize: "14px",
	    	fontFamily:"'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
	    	paddingLeft: "5px"
	    };
  	}
}

function PlaceDatails(props) {

	let source = CancelToken.source();
	const [place, setPlace] = useState({});
	const [startingPlace, setStartingPlace] = useState({});
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [photoFile, setPhotoFile] = useState();
	const [imageSize, setImageSize] = useState(200);
	const history = useHistory();
	const { placeId } = useParams();
	const addressField = useRef(null);
	const [managers, setManagers] = useState([]);
	const [managerCount, setManagerCount] = useState(0);

	const loggedUser = useRef();

	useEffect(() => {
		// component did mount
		getPlaceDetails();
		searchForCategories();

		return () => {
			// component will unmount
			source.cancel();
		}
	},[])

	useEffect(()=> {
		if (props.user != undefined && (loggedUser.current || {})._id != (props.user || {})._id) { 
			loggedUser.current = props.user;
			
			if (props.user.access == 30) { getPlaceManagers(); }
			
		}
		
	},[props.user])

	const getPlaceManagers = async (skip=0, limit=5) => {
		if (placeId == 'newplace') { return; }

		let response;
		try { response = await getManagers(source.token, placeId, skip, limit);
		}catch(e){
			if(e.__CANCEL__){ return; }
			return SweetAlert.fire(undefined,e.message,'error')
		}

		const { managers:remoteManagers, count } = response;

		setManagerCount(count);

		setManagers(remoteManagers);
	}

	const getPlaceDetails = async () => {
		
		if (placeId == 'newplace') { return; }

		let place;
		try { place = await getPlaceById(source.token, placeId)
		}catch(e){
			if(e.__CANCEL__){ return; }
			return SweetAlert.fire(undefined,e.message,'error')
		}
		
		setPlace(place);
		setStartingPlace({...place});

	}

	const searchForCategories = async (searchText) => {
		
		if (searchText == undefined || searchText.length >= 3){
			let data;
			try { data = await getCategories(source.token, 0, 10, searchText);
			}catch(e){
				if(e.__CANCEL__){ return; }
				return SweetAlert.fire(undefined,e.message,'error')
			}

			let categories = data.categories;

			let newCategoryOptions = categoryOptions.concat(categories.filter(c1 => categoryOptions.find(c2 => c1._id == c2._id) == undefined));

			setCategoryOptions(newCategoryOptions);
		}
	}

	const handleSelectAddress = (googlePlace) => {
		setPlace({ 
			...place,
			address: googlePlace.formattedAddress,
			geo:[googlePlace.coordinates.lng,googlePlace.coordinates.lat] 
		})
	}

	const changePlaceVariable = (variable, event) => {

		setPlace({...place, [variable]:event.target.value});
	}

	const changePlaceCategory = (option) => {

		setPlace({...place, category: option.value});
	}

	const handlePhotoPick = (file) => {
		const url = URL.createObjectURL(file);

		setPlace({...place, imageURL: url});

		setPhotoFile(file);
	}

	const getPayloadForEdition = (photoURL) => {

		let payload = {};
		for (let variable of Object.keys(place)) {
			if(JSON.stringify(place[variable]) != JSON.stringify(startingPlace[variable])){
				payload[variable] = place[variable];
			}
		}

		if (photoURL != undefined) { payload.imageURL = photoURL; }

		return payload;
	}

	const createNewPlace = async () => {

		SweetAlert.fire({
			title: 'Criando estabelecimento...',
			didOpen: () => {
				SweetAlert.showLoading()
			}
		});

		let savedPlace;
		try { savedPlace = await createPlace(source.token, place);
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		setPlace({ ...place, _id: savedPlace._id });

		if (photoFile != undefined) {
			try { await saveChanges(savedPlace._id);
			}catch(e){ console.log('error savingChanges after creating place',e); }
		}

		SweetAlert.hideLoading();

		SweetAlert.fire({
			icon: 'success',
			title: 'Estabelecimento criado com sucesso!',
			showConfirmButton: false,
			timer: 1300
		});

		history.push(`/places/${savedPlace._id}`);

	}

	const saveChanges = async (createdPlaceId) => {

		if (createdPlaceId == undefined) {
			SweetAlert.fire({
				title: 'Salvando alterações...',
				didOpen: () => {
					SweetAlert.showLoading()
				}
			});
		}

		let photoURL;
		if (photoFile != undefined) {
			try { photoURL = await uploadPlacePhoto(createdPlaceId || place._id);
			}catch(e) { 
				SweetAlert.hideLoading();
				return SweetAlert.fire(undefined,e.message,'error');
			}

			place.imageURL = photoURL;
		}

		let payload = getPayloadForEdition(photoURL);

		if (Object.keys(payload).length == 0) {
			SweetAlert.hideLoading();
			return SweetAlert.fire(undefined,'Sem alterações para salvar!','warning');
		}

		try { await editPlace(source.token, createdPlaceId || place._id, payload);
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		if (createdPlaceId == undefined) {
			SweetAlert.hideLoading();

			SweetAlert.fire({
				icon: 'success',
				title: 'Estabelecimento salvo com sucesso!',
				showConfirmButton: false,
				timer: 1300
			});
		}

	}

	const uploadPlacePhoto = async (pId) => {

		let response;
		try { response = await getSignedRequestForPlaceImage(source.token, pId || place._id, photoFile.type)
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		const { signedRequest, url } = response;

		try { await uploadFile(source.token, signedRequest, photoFile)
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		return url;

	}

	const handleSavePlace = async () => {

		if (place._id == undefined) {
			try { return await createNewPlace();
			}catch(e){ return console.log('problemas criando lugar novo',e); }
		}

		try { await saveChanges();
		}catch(e){ console.log('problemas salvando lugar',e); }

	}

	const handlePhotoError = (error) => {
		SweetAlert.fire(undefined,error.message,'error');
	}

	const addManager = async managerEmail => {
		SweetAlert.showLoading();

		try { await addUserAccess(source.token, placeId, managerEmail);
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			
			if (e.message == 'needs_creation') {

				let { value: password } = await SweetAlert.fire({
					text: `Digite abaixo a senha para criar esse usuário.`,
					title: `O e-mail "${managerEmail}" ainda não está associado com nenhum usuário.`,
					input: 'password',
					inputPlaceholder: 'Senha do gestor',
					inputAttributes: {
						autocomplete: 'new-password'
					},
					showCancelButton: true,
					cancelButtonText: 'Cancelar',
					confirmButtonText: 'Criar usuário',
					confirmButtonColor: '#00a65a'
				})

				SweetAlert.showLoading();

				try { await createManagerUser(source.token, placeId, managerEmail, password);
				}catch(e){
					SweetAlert.hideLoading();
					if (e.__CANCEL__) { return; }
					return SweetAlert.fire(undefined,e.message,'error');
				}

				SweetAlert.hideLoading();

				getPlaceManagers();

				return SweetAlert.fire({
					icon: 'success',
					title: 'Gestor cadastrado com sucesso!',
					showConfirmButton: false,
					timer: 1300
				});
			}

			return SweetAlert.fire(undefined,e.message,'error');
		}

		SweetAlert.hideLoading();

		getPlaceManagers();

		SweetAlert.fire({
			icon: 'success',
			title: 'Usuário transformado em gestor!',
			showConfirmButton: false,
			timer: 1300
		});
		
	}

	const removeManager = async manager => {
		console.log('fofura está sendo henry bugalho',manager)
		
		SweetAlert.showLoading();

		try {
			await removeUserAccess(source.token, placeId, manager._id);
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		SweetAlert.hideLoading();

		getPlaceManagers();

		SweetAlert.fire({
			icon: 'success',
			title: 'Usuário removido da gestão!',
			showConfirmButton: false,
			timer: 1300
		});

	}

	const handlePageChange = (page) => {
		getPlaceManagers(page.selected*5);
	}

	let categoryValue = categoryOptions.find(opt => opt._id == place.category);
	if (categoryValue != undefined) { categoryValue = { value: categoryValue._id, label:categoryValue.name }; }

	return (
		<div>
			<Container
				padding="20px"
				minHeight="0px"
				height="calc(100% - 50px)"
				transition="margin 400ms cubic-bezier(0.215, 0.61, 0.355, 1) !important"
				overflowY="scroll"
			>
				<Container
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					marginBottom="10px"
				>
					<Label
						color="#0594bb"				
						fontSize="16px"
					> 
						{place._id == undefined ? 'NOVO ESTABELECIMENTO' : `DETALHES DO ESTABELECIMENTO`} 
					</Label>

					<Container
						display="flex"
					>
						{placeId != 'newplace' &&
							<Button
								title="VER FILA"
								fontSize="14"
								height="32px"
								borderColor="#398439"
								bgColor="#00a65a"
								bgColorHover="#008d4c"
								onClick={() => {
									history.push(`/lines/${placeId}`);
								}}
							/>
						}

						<Button
							marginLeft={placeId != 'newplace' ? '8' : undefined}
							title="SALVAR"
							fontSize="14"
							height="32px"
							borderColor="#398439"
							bgColor="#00a65a"
							bgColorHover="#008d4c"
							onClick={handleSavePlace}
						/>
					</Container>


				</Container>

				<ContainerSpan 
					pictureWidth="100%" 
					pictureHeight={imageSize}
					marginBottom="20"
					position="relative"
	      		>
					<FileInput
						width="100%"
						placeholder="EDITAR IMAGEM"
						hasButton={false}
						height={`${imageSize}px`}
						cursorChange
			            onOk={handlePhotoPick}
			            onError={handlePhotoError}
			            type="file"
			            fileType={["image/jpeg","image/png"]}
			            bgImage={place.imageURL}
			            bgRepeat="no-repeat"
			            bgPosition="center center"
			            bgSize="cover"
		          	/>
	          		<Button
	          			title="VER IMAGEM"
	          			position="absolute"
	          			right="10px"
	          			bottom="10px"
	          			onClick={() => {setImageSize(imageSize == 200 ? 650 : 200)}}
	          		/>
	            </ContainerSpan>

				<Container
					display="flex"
					justifyContent="space-between"
				>
					<Container
						display="flex"
						flexDirection="column"
						width="49%"
					>
						<Input
							placeholder="Nome do estabelecimento"
							parentWidth="80%"
							parentHeight="38px"
							marginBottom="20px"
							value={place.name}
							onChange={(event) => changePlaceVariable('name',event)}
						/>

						<Container
							width="80%"
							marginBottom="20px"
						>
							<Select
								styles={customStyles}
								placeholder="Selecione a categoria..."
								options={categoryOptions.map(cat => ({ value: cat._id, label: cat.name }))}
								value={place.category != undefined ? categoryValue : undefined}
								onInputChange={event => {searchForCategories(event)}}
								onChange={changePlaceCategory}
							/>
						</Container>

						<Input
							placeholder="Expediente"
							parentWidth="80%"
							parentHeight="38px"
							marginBottom="20px"
							value={place.openedAt}
							onChange={(event) => changePlaceVariable('openedAt',event)}
						/>

						<Input
							placeholder="Tempo médio de atendimento"
							parentWidth="80%"
							parentHeight="38px"
							marginBottom="20px"
							value={place.avgTime}
							onChange={(event) => changePlaceVariable('avgTime',event)}
						/>

						<TextArea
							placeholder="Descrição do estabelecimento"
							width="80%"
							parentHeight="38px"
							marginBottom="20px"
							value={place.longDescription}
							onChange={(event) => changePlaceVariable('longDescription',event)}
						/>

						{placeId != 'newplace' && (loggedUser.current || {}).access == 30 &&
							<Container
								width="80%"
								marginBottom="20px"
							>
								<UserList
									showBox
									width="100%"
									limit={5}
									count={managerCount}
									placeholder="Gestores do estabelecimento"
									marginTop="0px"
									userList={managers.map(manager => ({name:manager.email, _id:manager._id}))}
									onAddPerson={addManager}
									onRemovePerson={removeManager}
									pageUpdateMethod={handlePageChange}
								/>
							</Container>
						}

						<Container display="flex">
							<Label display="flex" marginRight="10px">Usa o Ziptime?</Label>
							<Input 
								display="flex"
								type="checkbox"
								checked={["1",1,true,"true"].includes(place.usesZiptime)}
								onChange={(event) => changePlaceVariable('usesZiptime',{target:{value:event.target.checked ? "1" : "0"}})}
							/>
						</Container>

					</Container>


					<Container
						display="flex"
						flexDirection="column"
						width="49%"
					>
						<GoogleSearchBox 
							placeholder= "Digite o endereço do estabelecimento" 
							width="100%"
							ref={addressField}
							defaultValue={place.address}
							onSelectAddress={handleSelectAddress} 
			            />

						<Map
							height="450px" 
							width="100%"
							zoom={15}
							markers={[{
								position: place.geo != undefined ? { lng:place.geo[0],lat:place.geo[1] } : {lng:-46.633950,lat:-23.550389}
							}]}
						/>
					</Container>

				</Container>
			</Container>
		</div>
	)
}

const PlaceDatailsEnvelope = Auth(PlaceDatails);
export default withRouter(PlaceDatailsEnvelope)