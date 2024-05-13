import React, { useState, useEffect } from "react";
import Auth from "../components/Authentication";
import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";
import Table from "../components/Table";
import TableRow from "../components/TableRow";
import TableHeader from "../components/TableHeader";
import TableCell from "../components/TableCell";
import { getUsersList, useCancelToken } from "../helpers/requestHelper";
import { withRouter }  from "react-router-dom";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const SweetAlert = withReactContent(Swal);

import { useHistory } from 'react-router-dom';

const tableHeaders = [
	{ title: 'ID', variable: '_id', width:'19%' },
	{ title: 'Nome', variable: 'fullname', width:'24%'},
	{ title: 'E-mail', variable: 'email', width:'24%'},
	{ title: 'Idade', variable: 'age', width:'19%'},
	{ title: 'Endereço', variable: 'location', width:'14%'},
	{ title: 'Facebook', variable: 'facebookLinked', width:'12%'},
];

function UsersView(props)  {

	const limit = 15;
	const { newCancelToken, isCancel } = useCancelToken();
	const [users, setUsers] = useState([]);
	const [pagesCount, setPagesCount] = useState(0);
	const [userCount, setUserCount] = useState(0);
	const history = useHistory();

	useEffect(() => {
		// component did mount
		listUsersFromServer();
		

	},[])

	const listUsersFromServer = async (skip=0) => {
		
		let users, count;
		try { ({users, count} = await getUsersList(newCancelToken(), skip, limit))
		}catch(e){
			if(e.__CANCEL__){ return; }
			return SweetAlert.fire(undefined,e.message,'error')
		}

		setUserCount(count);
		setPagesCount(Math.ceil(count / limit));
		setUsers(users);

	}

	const createNewUser = () => {
		history.push('/users/newuser');
	}

	const handlePagination = (page) => {

		listUsersFromServer(page.selected * limit);
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
				<Label
					color="#0594bb"				
					fontSize="15px"
				> 
					USUÁRIOS 
				</Label>
				<Button
					title="+"
					fontSize="16px"
					fontWeight="bold"
					width="32px"
					height="32px"
					borderColor="#398439"
					bgColor="#00a65a"
					bgColorHover="#008d4c"
					onClick={createNewUser}
				/>

			</Container>


			<Table
				pagination
				totalItem={userCount}
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
					users.map((user,i) => {
						return (
							<TableRow
								key={i}
								display="flex"
								onClick={() => {
									history.push(`/users/${user._id}`);
								}}
							>
								{tableHeaders.map((header,index) => {
									return (
										<TableCell
											key={index}
											width={header.width}
										>
											{user[header.variable]}
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

const UsersViewEnvelope = Auth(UsersView);
export default withRouter(UsersViewEnvelope)