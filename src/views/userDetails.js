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
	getUserById, 
	createUser, 
	editUser, 
	getSignedRequestForUserImage, 
	uploadFile,
	addUserAccess,
	removeUserAccess,
	createManagerUser, 
	useCancelToken
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

function UserDetails(props) {

	const { newCancelToken, isCancel } = useCancelToken();
	const [user, setUser] = useState({});
	const [startingUser, setStartingUser] = useState({});
	const [photoFile, setPhotoFile] = useState();
	const history = useHistory();
	const { userId } = useParams();
	const addressField = useRef(null);

	useEffect(() => {
		// component did mount
		getUserDetails();

	},[])

	const getUserDetails = async () => {
		
		if (userId == 'newuser') { return; }

		let user;
		try { user = await getUserById(newCancelToken(), userId)
		}catch(e){
			if(e.__CANCEL__){ return; }
			return SweetAlert.fire(undefined,e.message,'error')
		}
		
		setUser(user);
		setStartingUser({...user});

	}

	const handleSelectAddress = (googlePlace) => {
		setUser({ 
			...user,
			address: googlePlace.formattedAddress,
			coordinates: googlePlace.coordinates
		})
	}

	const changeUserVariable = (variable, event) => {
		setUser({...user, [variable]:event.target.value});
	}

	const handlePhotoPick = (file) => {
		const url = URL.createObjectURL(file);

		setUser({...user, imageURL: url});

		setPhotoFile(file);
	}

	const getPayloadForEdition = (photoURL) => {

		let payload = {};
		for (let variable of Object.keys(user)) {
			if(JSON.stringify(user[variable]) != JSON.stringify(startingUser[variable])){
				payload[variable] = user[variable];
			}
		}

		if (photoURL != undefined) { payload.imageURL = photoURL; }

		return payload;
	}

	const createNewUser = async () => {

		SweetAlert.fire({
			title: 'Criando usuário...',
			didOpen: () => {
				SweetAlert.showLoading()
			}
		});

		let savedUser;
		try { savedUser = await createUser(newCancelToken(), user);
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		setUser({ ...user, _id: savedUser._id });

		if (photoFile != undefined) {
			try { await saveChanges(savedUser._id);
			}catch(e){ console.log('error savingChanges after creating user',e); }
		}

		SweetAlert.hideLoading();

		SweetAlert.fire({
			icon: 'success',
			title: 'Usuário criado com sucesso!',
			showConfirmButton: false,
			timer: 1300
		});

		history.push(`/users/${savedUser._id}`);

	}

	const saveChanges = async (createdUserId) => {

		if (createdUserId == undefined) {
			SweetAlert.fire({
				title: 'Salvando alterações...',
				didOpen: () => {
					SweetAlert.showLoading()
				}
			});
		}

		let photoURL;
		if (photoFile != undefined) {
			try { photoURL = await uploadUserPhoto(createdUserId || user._id);
			}catch(e) { 
				SweetAlert.hideLoading();
				return SweetAlert.fire(undefined,e.message,'error');
			}

			user.imageURL = photoURL;
		}

		let payload = getPayloadForEdition(photoURL);

		if (Object.keys(payload).length == 0) {
			SweetAlert.hideLoading();
			return SweetAlert.fire(undefined,'Sem alterações para salvar!','warning');
		}

		try { await editUser(newCancelToken(), createdUserId || user._id, payload);
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		if (createdUserId == undefined) {
			SweetAlert.hideLoading();

			SweetAlert.fire({
				icon: 'success',
				title: 'Usuário salvo com sucesso!',
				showConfirmButton: false,
				timer: 1300
			});
		}

	}

	const uploadUserPhoto = async (uId) => {

		let response;
		try { response = await getSignedRequestForUserImage(newCancelToken(), uId || user._id, photoFile.type)
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		const { signedRequest, url } = response;

		try { await uploadFile(newCancelToken(), signedRequest, photoFile)
		}catch(e){
			SweetAlert.hideLoading();
			if (e.__CANCEL__) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		return url;

	}

	const handleSaveUser = async () => {

		if (user._id == undefined) {
			try { return await createNewUser();
			}catch(e){ return console.log('problemas criando usuário novo',e); }
		}

		try { await saveChanges();
		}catch(e){ console.log('problemas salvando usuário',e); }

	}

	const handlePhotoError = (error) => {
		SweetAlert.fire(undefined,error.message,'error');
	}

	// const handlePageChange = (page) => {
	// 	getPlaceManagers(page.selected*5);
	// }

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
						{user._id == undefined ? 'NOVO USUÁRIO' : `DETALHES DO USUÁRIO`} 
					</Label>

					<Container
						display="flex"
					>
						<Button
							marginLeft={userId != 'newuser' ? '8' : undefined}
							title="SALVAR"
							fontSize="14"
							height="32px"
							borderColor="#398439"
							bgColor="#00a65a"
							bgColorHover="#008d4c"
							onClick={handleSaveUser}
						/>
					</Container>


				</Container>

				<Container
					display="flex"
					justifyContent="space-between"
				>
					<Container
						display="flex"
						flexDirection="column"
						width="49%"
					>

						<Container
							display="flex"
							flexDirection="row"
							width="100%"
							justifyContent="space-between"
						>

							<Container
								display="flex"
								width="100px"
								height="100px"
							>
								<FileInput
									width='100px'
									height='100px'
									placeholder=""
									hasButton={false}
									cursorChange
						            onOk={handlePhotoPick}
						            onError={handlePhotoError}
						            type="file"
						            fileType={["image/jpeg","image/png"]}
						            bgImage={user.imageURL}
						            bgRepeat="no-repeat"
						            bgPosition="center center"
						            bgSize="cover"
					          	/>
				          	</Container>

				          	<Container
								display="flex"
								flexDirection="column"
								width="calc(100% - 120px)"
							>
								<Input
									placeholder="Nome completo"
									parentWidth="100%"
									parentHeight="38px"
									marginBottom="20px"
									value={user.fullname}
									onChange={(event) => changeUserVariable('fullname',event)}
								/>

								<Input
									placeholder="E-mail"
									parentWidth="100%"
									parentHeight="38px"
									marginBottom="20px"
									value={user.email}
									onChange={(event) => changeUserVariable('email',event)}
								/>

							</Container>
						</Container>
						<Input
							placeholder="Idade"
							parentWidth="100%"
							parentHeight="38px"
							marginBottom="20px"
							value={user.age}
							onChange={(event) => changeUserVariable('age',event)}
						/>

							

						{/*{userId != 'newuser' &&
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
						}*/}

						<Container display="flex" flexDirection="column">
							<Label display="flex" marginRight="10px">Gênero</Label>
							<Input 
								display="flex"
								type="radio"
								options={[
									{label:'Masculino', value:'male'},
									{label:'Feminino', value:'female'},
									{label:'Outro', value:'other'}
								]}
								selectedRadio={user.gender}
								onChange={(event) => changeUserVariable('gender',event)}
							/>
						</Container>

					</Container>


					<Container
						display="flex"
						flexDirection="column"
						width="49%"
					>
						<GoogleSearchBox 
							placeholder= "Digite o endereço do usuário" 
							width="100%"
							ref={addressField}
							defaultValue={user.address}
							onSelectAddress={handleSelectAddress} 
			            />

						<Map
							height="450px" 
							width="100%"
							zoom={15}
							markers={[{
								position: user.coordinates != undefined ? user.coordinates : {lng:-46.633950,lat:-23.550389}
							}]}
						/>
					</Container>

				</Container>
			</Container>
		</div>
	)
}

const UserDatailsEnvelope = Auth(UserDetails);
export default withRouter(UserDatailsEnvelope)