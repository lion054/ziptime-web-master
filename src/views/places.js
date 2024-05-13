import React, { useState, useEffect } from "react";
import Auth from "../components/Authentication";
import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import TableRow from "../components/TableRow";
import TableHeader from "../components/TableHeader";
import TableCell from "../components/TableCell";
import { CancelToken, getPlacesList } from "../helpers/requestHelper";
import { withRouter }  from "react-router-dom";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const SweetAlert = withReactContent(Swal);

import { useHistory } from 'react-router-dom';

const tableHeaders = [
	{ title: 'ID', variable: '_id', width:'19%' },
	{ title: 'Nome', variable: 'name', width:'24%'},
	{ title: 'Categoria', variable: 'categoryId', width:'19%'},
	{ title: 'Expediente', variable: 'openedAt', width:'14%'},
	{ title: 'Ziptime', variable: 'Lms', width:'12%'},
	{ title: 'Ações', variable: '', width:'12%'},
];

function Places(props)  {

	let source = CancelToken.source();
	const limit = 15;
	const [places, setPlaces] = useState([]);
	const [pagesCount, setPagesCount] = useState(0);
	const [placeCount, setPlaceCount] = useState(0);
	const [searchText, setSearchText] = useState();
	const history = useHistory();
	let input;

	useEffect(() => {
		// component did mount
		listPlacesFromServer();

		return () => {
			// component will unmount
			source.cancel();
		}
	},[])

	useEffect(() => {
		// all times that searchText changes
		
		if (searchText == undefined) { listPlacesFromServer(); }
	},[searchText])

	const listPlacesFromServer = async (skip=0) => {
		
		let places, count;
		try { ({places, count} = await getPlacesList(source.token, skip, limit, searchText))
		}catch(e){
			if(e.__CANCEL__){ return; }
			return SweetAlert.fire(undefined,e.message,'error')
		}

		setPlaceCount(count);
		setPagesCount(Math.ceil(count / limit));
		setPlaces(places);

	}

	const createNewPlace = () => {
		history.push('/places/newplace');
	}

	const handlePagination = (page) => {
		listPlacesFromServer(page.selected * limit);
	}

	const onChangeSearchText = (event) => {
		setSearchText(event.target.value);
	}

	const handleClearSearchText = () => {
		setSearchText(undefined);
	}

	const handleSearchPlaces = () => {
		listPlacesFromServer();
	}

	const onSearchKeyUp = e => {
		if (e.keyCode == 13) {
			listPlacesFromServer();
		}
	}

	return (
		<Container
			padding="20px"
			minHeigh="0px"
			height="100vh"
			transition="margin 400ms cubic-bezier(0.215, 0.61, 0.355, 1) !important"
			overflow="inherit"
		>
			<Container
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				marginBottom="20px"
			>
				<Container
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					marginBottom="20px"
				>

					<Label
						color="#0594bb"				
						fontSize="15px"
					> 
						ESTABELECIMENTOS 
					</Label>

					<Input
	                    parentWidth="300px"
	                    marginBottom="0"
	                    marginLeft="20px"
	                    parentHeight="38px"
	                    placeholder="Buscar estabelecimentos"
	                    onChange={onChangeSearchText}
	                    handleClear={handleClearSearchText}
	                    onKeyUp={onSearchKeyUp}
	                />

	                <Button
						title="BUSCAR"
						fontSize="12px"
						marginLeft="20px"
						height="32px"
						borderColor="#398439"
						bgColor="#00a65a"
						bgColorHover="#008d4c"
						onClick={handleSearchPlaces}
					/>
                </Container>
				
				{(props.user || {}).access == 30 &&
					<Button
						title="+"
						fontSize="16px"
						fontWeight="bold"
						width="32px"
						height="32px"
						borderColor="#398439"
						bgColor="#00a65a"
						bgColorHover="#008d4c"
						onClick={createNewPlace}
					/>
				}

			</Container>


			<Table
				pagination
				totalItem={placeCount}
				totalPage={pagesCount}
				handleNextPage={handlePagination}
				tHead={
					<TableRow display="flex" width="100%">
						{tableHeaders.map((header,index) => {
							return (
								<TableHeader 
									key={index}
									width={header.width}
								>
									{header.title}
								</TableHeader>
							)
						})}
					</TableRow>
				}
				tBody={
					places.map((place,i) => {
						return (
							<TableRow
								key={i}
								display="flex"
								onClick={() => {
									history.push(`/places/${place._id}`);
								}}
							>
								{tableHeaders.map((header,index) => {
									return (
										<TableCell
											key={index}
											width={header.width}
										>
											{place[header.variable]}
										</TableCell>
									)
								})}
							</TableRow>
						)	
					})
				}
			/>

		</Container>
	)
}

const PlacesEnvelope = Auth(Places);
export default withRouter(PlacesEnvelope)