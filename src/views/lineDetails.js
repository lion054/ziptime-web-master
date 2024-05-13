import React, { useState, useEffect } from "react";
import Auth from "../components/Authentication";
import Table from "../components/Table";
import TableRow from "../components/TableRow";
import TableHeader from "../components/TableHeader";
import TableCell from "../components/TableCell";
import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";
import TimeBox from "../components/TimeBox";
import { withRouter, useParams }  from "react-router-dom";
import Select from "react-select";

import {
	addCostumerToLine,
	getPlaceLine,
	putUserStatusInLine,
	removeUserFromPlaceLine,
	getLineOverview,
	useCancelToken
} from '../helpers/requestHelper';

import bell from "../assets/images/bell.svg";

import pause from "../assets/images/pause.svg";
import trash from "../assets/images/trash.svg";
import checkbox from "../assets/images/checkbox.svg";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const SweetAlert = withReactContent(Swal);

const tableHeadersOpen = [
	{ title: 'Entrada', variable: 'createdAt', width:'15%', type:'label' },
	{ title: 'Cliente', variable: 'name', width:'35%', type:'label' },
	{ title: 'Assentos', variable: 'seats', width:'5%', type:'label' },
	{ title: 'Status', variable: 'status', width:'5%', type:'circle' },
	{ title: 'Atender', variable: '', width:'10%', type:'btn', icon: checkbox, status: 1 },
	{ title: 'Em Espera', variable: '', width:'10%', type:'btn', icon: pause, status: 2 },
	{ title: 'Notificar', variable: '', width:'10%', type:'btn', icon: bell, status: 3 },
	{ title: 'Remover', variable: '', width:'10%', type:'btn', icon: trash }
];

const tableHeadersConfirmed = [
	{ title: 'Entrada', variable: 'createdAt', width:'18%', type:'label' },
	{ title: 'Atendimento', variable: 'confirmedAt', width:'18%', type:'label' },
	{ title: 'Espera (mins)', variable: 'timeInMinutes', width:'14%', type:'label' },
	{ title: 'Cliente', variable: 'name', width:'40%', type:'label' },
	{ title: 'Assentos', variable: 'seats', width:'5%', type:'label' },
	{ title: 'Status', variable: 'status', width:'5%', type:'circle' }
];

const possibleStatus = [
	{ title: "Na fila", color: "#00c0ef", code: 0 }, 
	{ title: "Em espera", color:"#f39c12", code: 2 }, 
	{ title: "Notificados", color: "#000", icon: bell, code: 3 }, 
	{ title: "Está aqui", color: "#00a65a", code: 4 },
	{ title: "Atendido", color: "#b900ff", code: 1 }
];

const fontOptions = {
    fontSize: "13px",
    fontFamily: "'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif"
}

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
	valueContainer: (provided, state) => ({
	    ...provided,
	    height: '30px'
	}),
  	control: (provided, state) => {
	    let { isFocused, isSelected } = state;

	    return {
		    ...provided,
		    ...fontOptions,
	    	height: '30px',
	    	minHeight: '30px',
		    borderRadius: "0px",
		    boxShadow: "none",
		    borderColor: isFocused ? "#3c8dbc" : "#dbdbdb",
		    '&:hover': {
		        borderColor: isFocused ? "#3c8dbc" : "#dbdbdb",
		    }
	    }
  	},
  	indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    })
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function LineDetails(props) {

	const [clientsWaiting, setClientsWaiting] = useState([]);
	const [clientsWaitingCount, setClientsWaitingCount] = useState(0);
	const [lineMoment, setLineMoment] = useState(0);
	const limit = 15;
	const { newCancelToken, isCancel } = useCancelToken();

	const [lastUpdatedAt, setLastUpdatedAt] = useState(null);
	const [page, setPage] = useState(0);
	const [averageWaitingTime, setAverageWaitingTime] = useState('');
	const [totalWaitingTime, setTotalWaitingTime] = useState('');
	const [statusOverview, setStatusOverview] = useState({});
	const [placeName, setPlaceName] = useState('');

	const pagesCount = Math.ceil(clientsWaitingCount / limit);

	const { placeId } = useParams();

	const tableHeaders = lineMoment == 0 ? tableHeadersOpen : tableHeadersConfirmed;

	const lineMomentOptions = [
		{value: 0, label:"Em atendimento"},
		{value: 1, label:"Atendidos"}
	];
	
	useEffect(() => {
		listUsersInLine();
		getOverviewForLine();

	},[])

	useEffect(() => {
		
		// this is needed so that the timer is cleanup in the proper moment
		// when user changes line moment the old timeout was not updated causing the timeout to use the old state.	
		let timerId = setTimeout(() => {
			updateLineEveryFifteenSeconds();
		}, 15000);

		return () => {
			clearTimeout(timerId);
		}

	}, [lastUpdatedAt, lineMoment])

	useEffect(() => {

		listUsersInLine();

	}, [lineMoment])

	const updateLineEveryFifteenSeconds = async () => {

		let overviewRes = getOverviewForLine();
		let listRes = listUsersInLine(page * limit);
		
		try { await listRes;
		}catch(e){ console.log('error list UsersInLine',e); }

		try { await overviewRes;
		}catch(e){ console.log('error get OverviewForLine',e); }

		setLastUpdatedAt(new Date());
	}

	const listUsersInLine = async (skip=0) => {

		let response;
		try { response = await getPlaceLine(newCancelToken(), placeId, skip, limit, lineMoment)
		}catch(e){
			if (isCancel(e)) { return; }
		}

		let { count, placeLine } = response;

		setClientsWaiting(placeLine);
		setClientsWaitingCount(count);

	}

	const getOverviewForLine = async () => {

		let response;
		try { response = await getLineOverview(newCancelToken(), placeId);
		}catch(e){
			if (isCancel(e)) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		setStatusOverview((response || {}).lineStati || {});
		setTotalWaitingTime((response || {}).totalWaitingTime || 0);
		setAverageWaitingTime((response || {}).averageWaitingTime || 0);
		setPlaceName((response || {}).placeName);

	}

	const handleSelectLineMoment = option => {
		setLineMoment(option.value);
	}

	const handleAddClientInLine = async () => {
		
		let input;
		try {
			input = await SweetAlert.fire({
				title: 'Adicionar cliente na fila',
			  	html:
			    `<input placeholder="Nome do cliente" id="swal-input1" class="swal2-input">
			     <input placeholder="E-mail" id="swal-input2" class="swal2-input">
			     <input value="1" placeholder="Quantidade de pessoas" id="swal-input3" class="swal2-input">`,
			  	focusConfirm: false,
			  	confirmButtonText: 'Adicionar',
			  	confirmButtonColor: '#00a65a',
			  	cancelButtonText: 'Cancelar',
			  	showCancelButton: true,
			  	preConfirm: () => {

			  		const retVal = {
				    	name: document.getElementById('swal-input1').value,
				    	email: document.getElementById('swal-input2').value,
				    	seats: document.getElementById('swal-input3').value
				    };

				    return retVal;
			  	}
			})
		}catch(e){ return SweetAlert.fire(undefined,e.message,'error'); }

		const { value } = input;

		if ([undefined,""].includes(value.name)) { 
			let result = await SweetAlert.fire({
				title:'Nome não pode ficar em branco!',
				icon:'error', 
				showCancelButton: true, 
				cancelButtonText: 'Cancelar'
			}); 

			if (result.isConfirmed) { handleAddClientInLine(); }
			return;
		}

		if ([undefined,""].includes(value.name)) { 
			let result = await SweetAlert.fire({
				title:'E-mail não pode ficar em branco!',
				icon:'error', 
				showCancelButton: true, 
				cancelButtonText: 'Cancelar'
			}); 

			if (result.isConfirmed) { handleAddClientInLine(); }
			return;
		}

		console.log('calaboca docinha',value)

		if (value) {
			try {
				await addCostumerToLine(newCancelToken(), placeId, value);
			}catch(e){
				if (isCancel(e)) { return; }
				return SweetAlert.fire(undefined,e.message,'error');
			}
			
		}

	}

	const handleCostumerAction = async (newStatus, userId) => {

		SweetAlert.fire({
			title: 'Atualizando status...',
			didOpen: () => {
				SweetAlert.showLoading()
			}
		});

		if(!newStatus) {
			// remove costumer from line
		
			try {
				await removeUserFromPlaceLine(newCancelToken(), placeId, userId);
			}catch(e){
				SweetAlert.close();
				if (isCancel(e)) { return; }
				return SweetAlert.fire(undefined,e.message,'error');
			}

			SweetAlert.close();

			return;	
		}


		try {
			await putUserStatusInLine(newCancelToken(), placeId, newStatus, userId);
		}catch(e){
			SweetAlert.hideLoading();
			if (isCancel(e)) { return; }
			return SweetAlert.fire(undefined,e.message,'error');
		}

		SweetAlert.close();
		

	}

	return (
		<Container
			display="flex"
			padding="30px"
		>
			<Container
				display="flex"
				width="66.67%"
				flexDirection="column"
				paddingRight="20px"
			>

				<Container
					display="flex"
					width="100%"
					justifyContent="space-between"
				>
					<Label 
						color="#0594bb" 
						fontSize="18px"
						marginBottom="12px"
					>
						{`Fila - ${placeName}`}
					</Label>
					
					<Container display="flex" alignItems="center" flexDirection="row">
						<Button 
							title="+ Cliente"
							bgColor="#00a65a"
							bgColorHover="#008d4c"
							onClick={handleAddClientInLine}
						/>

						<Container marginLeft="10px" height="30px" width="200px">
							<Select
								styles={customStyles}
								defaultValue={lineMomentOptions.find(opt => opt.value == lineMoment)}
								options={lineMomentOptions}
								onChange={handleSelectLineMoment}
							/>
						</Container>
					</Container>
				</Container>

				<Table
					pagination
					totalItem={clientsWaitingCount}
					totalPage={pagesCount}
					notFoundTitle="Sem clientes na fila"
					tHead={
						<TableRow display="flex" width="100%">
							{tableHeaders.map((header, index) => {
								return (
									<TableHeader 
										key={`header${index}`}
										width={header.width}
										display="flex"
										justifyContent="center"
										paddingLeft="0"
									>
										{header.title}
									</TableHeader>
								)
							})}
						</TableRow>
					}
					tBody={
						clientsWaiting.map((client,i) => {
							return (
								<TableRow
									key={i}
									display="flex"
									alignItems="center"
								>
									{tableHeaders.map((header,j) => {
										let status = possibleStatus.find(sts => sts.code == Number(client.status));

										return (
											<TableCell
												key={`mainTable${i}.${j}`}
												width={header.width}
												display="flex"
												justifyContent="center"
											>
												{header.type == 'label' &&
													<Label>{client[header.variable]}</Label>
												}
												{header.type == 'circle' &&
													<div>
														{(status || {}).icon && 
															<Container 
																width="12px" 
																height="12px" 
																bgImage={`url(${status.icon})`} 
																bgSize="contain" 
															/>
														}
														{!(status || {}).icon &&
															<Container
																display="flex"
																width="12px"
																height="12px"
																borderRadius="50%"
																bgColor={(status || {}).color}
															/>
														}
													</div>
												}
												{header.type == 'btn' &&
													<Container 
														width="25px" 
														height="25px" 
														bgImage={`url(${header.icon})`} 
														bgSize="contain" 
														onClick={() => {handleCostumerAction(header.status, client.userId)}}
													/>
												}
											</TableCell>
										)
									})}
								</TableRow>
							)	
						})
					}
				/>

			</Container>

			<Container
				display="flex"
				width="33.33%"
				flexDirection="column"

			>

				<Container
					display="flex"
					width="100%"
					justifyContent="space-around"
				>

					<TimeBox 
						title="Tempo de espera"
						timeValue={totalWaitingTime}
					/>

					<TimeBox 
						title="Média de espera"
						timeValue={averageWaitingTime}
						bgColor="#f39c12"
					/>

				</Container>

				<Container
					marginTop="20px"
					display="flex"
					width="100%"
				>
					<Table
						totalItem={4}
						totalPage={1}
						tHead={
							<TableRow display="flex" width="100%">
								<TableHeader 
									width="100%"
									textAlign="center"
								>
									Informações da fila
								</TableHeader>
							</TableRow>
						}
						tBody={
							possibleStatus.map((status,key) => {
								return (
									<TableRow
										key={key}
										display="flex"
										height="25px"
									>
										<TableCell 
											padding="4px" 
											width="90%" 
											display="flex"
											alignItems="center"
										>
											{status.icon && <Container width="12px" height="12px" bgImage={`url(${status.icon})`} bgSize="contain" />}
											{!status.icon && <Container borderRadius="50%" width="12px" height="12px" bgColor={status.color} />}
											
											<Label marginLeft="8px">{status.title}</Label>
										</TableCell>
										<TableCell 
											padding="4px"
											width="10%"
											align="right"
										>
											<Label 
												padding="1px 7px" 
												borderRadius="10px" 
												bgColor={status.color} 
												color="white"
												fontWeight="700"
												fontSize="12px"
											>
												{statusOverview[status.code] || "0"}
											</Label>
										</TableCell>
										
									</TableRow>
								)
							})
						}
					/>

				</Container>

			</Container>
		</Container>
	)

}

const LineDetailsEnvelope = Auth(LineDetails);
export default withRouter(LineDetailsEnvelope)