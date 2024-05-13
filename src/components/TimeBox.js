import React from "react";
import clock from "../assets/images/clock.svg";
import Container from "./Container";

function TimeBox ({
	title = 'Título',
	timeValue = '--',
	bgColor = "#00c0ef",
	marginLeft
}) {

	return (
		<Container
			display="flex"
			flexDirection="column"
			padding="10px"
			width="190px"
			height="102px"
			bgColor={bgColor}
			position="relative"
			marginLeft={marginLeft}
		>
			<p style={{
				margin: '0 0 10px',
				color:'white', 
				fontFamily: `'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif`,
				fontSize: '15px',
				WebkitFontSmoothing: 'antialiased'
			}}>
				{title}
			</p>

			<h3 style={{
				margin: '0 0 10px 0',
				color:'white', 
				fontWeight: 'bold',
				fontFamily: `'Source Sans Pro',sans-serif`,
				fontSize: '38px',
				zIndex: 100
			}}>
				{!isNaN(Number(timeValue)) ? `${timeValue}m` : timeValue}
			</h3>

			<Container
				width="70px"
				height="70px"
				bgImage={`url(${clock})`}
				bgSize="contain"
				bgRepeat="no-repeat"
				position="absolute"
				right="10px"
				bottom="10px"
			/>

		</Container>
	)
}

export default TimeBox;