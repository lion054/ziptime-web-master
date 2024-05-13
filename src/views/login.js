import React, { useState, useEffect } from "react";
import Auth from "../components/Authentication";
import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import Label from "../components/Label";
import { CancelToken, signUserIn } from "../helpers/requestHelper.js";

import { withRouter }  from "react-router-dom";

import ziptimeBg from "../assets/images/background.png";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
const SweetAlert = withReactContent(Swal);

import { useDispatch } from 'react-redux';
import { saveUser } from '../store/appSlice';

function Login (props) {

	const dispatch = useDispatch();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState(false);
	let source = CancelToken.source();

	useEffect(() => {
		// component did mount / update


		return () => {
			// component will unmount
			source.cancel();
		}
	})

	const handleSignIn = async () => {
		
		if(["", undefined].includes(email)) { return SweetAlert.fire({text:'Digite seu e-mail',icon:'warning', allowEnterKey:false}); }
    	if(["", undefined].includes(password)) { return SweetAlert.fire({text:'Digite sua senha',icon:'warning',allowEnterKey:false}); }

		let user;
		try { user = await signUserIn({email, password}, source.token);
		}catch(e){
			if(e.__CANCEL__){ return; }
			if (e.response.status == 401) { return setPasswordError(true); }
			
			return SweetAlert.fire(undefined,e.message,'error')
		}

		dispatch(saveUser(user));

	}

	const handleKeyPress = (event) => {
		
		switch( event.keyCode ) {
			case 13:
				event.target.blur();
				handleSignIn();
				
				break;
			default: 
				break;
		}
	}

	const handleChangeEmail = (event) => {
		setEmail(event.target.value);
	}

	const handleChangePassword = (event) => {
		setPassword(event.target.value);
	}

	return (
		<Container
			display="flex"
		>
			<Container 
				display="flex"
				bgImage={`url(${ziptimeBg})`} 
				bgRepeat="no-repeat"
				bgSize="cover"
				width="50%"
				height="100vh"
			/>


			<Container 
				display="flex"
				alignItems="center"
				justifyContent="center"
				width="50%"
				height="100vh"
				right="0"
			>
				<Container
					display="flex"
					width="500px"
					height="270px"
					flexDirection="column"
				>
					<Label 
						marginBottom="10"
						color="#9e9e9e"
					>
						LOGIN ZIPTIME
					</Label>
					<Container
						display="flex"
						width="100%"
						height="auto"
						marginBottom="20px"
					>

						<Button
							title="Entre com o Facebook"
							width="50%"
							marginRight="30"
							bgColor="#3b5998"
							bgColorHover="#2d4373"
						/>
						<Button
							title="Entre com o Google"
							width="50%"
							bgColor="#dd4b39"
							bgColorHover="#c23321"
						/>
						
					</Container>

					<Container
						display="flex"
						width="100%"
						height="auto"
						justifyContent="center"
						alignItems="center"
						marginBottom="10px"
					>
						<Container 
							width="100px" 
							height="1px" 
							bgColor="#9e9e9e"
							marginBottom="10px"
							marginRight="5px"
						/>

						<Label color="#9e9e9e" marginBottom="10">OU</Label>

						<Container 
							width="100px" 
							height="1px" 
							bgColor="#9e9e9e"
							marginBottom="10px"
							marginLeft="5px"
						/>
						
					</Container>

					<Container
						display="flex"
						width="100%"
						height="auto"
						flexDirection="column"
						marginBottom="20px"
					>
						<Input 
							parentWidth="100%"
							parentHeight="38px"
							marginBottom="10px"
							inputType="email"
							placeholder="E-MAIL"
							value={email}
							onChange={handleChangeEmail}
							onKeyDown={handleKeyPress}
						/>
						<Input 
							parentWidth="100%"
							parentHeight="38px"
							marginBottom={passwordError ? "10px" : "0px"}
							inputType="password"
							placeholder="SENHA"
							value={password}
							onChange={handleChangePassword}
							onKeyDown={handleKeyPress}
						/>

						{passwordError && 
							<Label 
								display="flex"
								justifyContent="center"
								color="#a94442" 
							> 
								E-mail e/ou senha incorretos, tente novamente!
							</Label>
						}
					</Container>

					<Container
						display="flex"
						justifyContent="flex-end"
						width="100%"
						height="auto"
					>
						<Button
							display="flex"
							justifyContent="center"
							title="ENTRAR"
							width="calc(50% - 15px)"
							marginRight="0"
							bgColor="#007bb6"
							bgColorHover="#005983"
							onClick={handleSignIn}
						/>
					</Container>

				</Container>
				
			</Container>
		</Container>
	)
		
	
}

const LoginEnvelope = Auth(Login);
export default withRouter(LoginEnvelope)