import React, { useState } from 'react';
import Container from './Container';
import Button from "./Button";
import Label from "./Label";
import ziptimeLogo from '../assets/images/logo.png';
import userImg from '../assets/images/user.svg';

import { useHistory } from 'react-router-dom';

export default function Header ({ user, onLogout }) {
	const history = useHistory();
	const [profileOpened, setProfileOpened] = useState(false);

	const goToPlaces = () => {
		history.push('/places');
	}

	const goToUsers = () => {
		history.push('/users');
	}

	const openProfile = () => {
		setProfileOpened(!profileOpened);
	}

	const goToProfile = () => {

	}

	const handleLogout = () => {
		onLogout();
	}

	return (
		<div>
			<Container 
				height="50px"
				width="100%"
				bgColor="#0594bb"
				display="flex"
				alignItems="center"
			>
				<Container
					display="flex"
					height="50px"
					width="174px"
					bgImage={`url(${ziptimeLogo})`}
					bgRepeat="no-repeat"
					bgPosition="center"
				>
					
				</Container>

				<Button
					title="ESTABELECIMENTOS"
					padding="0px 15px"
					height="50"
					paddingTop="0px"
					lineHeight="50px"
					borderRadius="0px"
					bgColor="#2d87aa"
					onClick={goToPlaces}
				/>

				{(user || {}).access == 30 &&
					<Button
						title="CATEGORIAS"
						padding="0px 15px"
						height="50"
						paddingTop="0px"
						lineHeight="50px"
						borderRadius="0px"
						bgColor="#2d87aa"
					/>
				}
				{(user || {}).access == 30 &&
					<Button
						title="USUÁRIOS"
						padding="0px 15px"
						height="50"
						paddingTop="0px"
						lineHeight="50px"
						borderRadius="0px"
						bgColor="#2d87aa"
						onClick={goToUsers}
					/>
				}

				<Button
					title={`Olá, ${((user.fullname || 'usuário').split(' ') || [])[0]}`}
					padding="0px 15px"
					height="50"
					lineHeight="50px"
					paddingTop="0px"
					borderRadius="0px"
					bgColorHover="#2d87aa"
					bgColor="#0594bb"
					marginLeft="auto"
					marginRight="20"
					onClick={openProfile}
				/>

				{profileOpened &&
					<Container
						position="absolute"
						width="280px"
						bgColor="#f9f9f9"
						height="234px"
						right="20px"
						top="50px"
						zIndex="200"
					>
						<Container
							width="280px"
							bgColor="#0594bb"
							height="175px"
							border="solid #fff"
							borderWidth="1px 1px 0px 1px"
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
						>

							<Container
								display="flex"
								width="90px"
								height="90px"
								borderColor="rgba(255, 255, 255, 0.2)"
								borderRadius="50%"
								borderWidth="3px"
								borderStyle="solid"
								overflow="hidden"
							>
								<Container
									width="100%"
									height="100%"
									bgColor="#fff"
									bgOrigin="content-box"
									bgSize="cover"
									paddingTop="10px"
									bgImage={`url(${userImg})`}
									bgRepeat="no-repeat"
								/>
							</Container>

							<Label 
								marginTop="12px" 
								display="flex"
								fontSize="17px"
								color="#fff"
								fontWeight="normal"
							>
								{user.fullname}
							</Label>
							<Label 
								display="flex"
								color="#fff"
								fontWeight="normal"
							>
								{user.email}
							</Label>
								
						</Container>
						<Container
							width="280px"
							bgColor="#f9f9f9"
							height="59px"
							border="solid 1px #0594bb"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Button 
								marginLeft="10px"
								diplay="flex" 
								title="Perfil" 
								bgColor="#00a65a"
								onClick={goToProfile}
							/>
							<Button 
								marginRight="10px"
								diplay="flex" 
								title="Sair" 
								bgColor="#00a65a"
								onClick={handleLogout}
							/>

						</Container>
					</Container>
				}
			</Container> 
			<Container 
				height="5px"
				width="100%"
				bgColor="#fff"
			/>
			<Container 
				height="5px"
				width="100%"
				bgColor="#0594bb"
			/>
		</div>
	)
}

