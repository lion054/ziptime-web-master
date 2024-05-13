import styled from "styled-components";
import React from "react";

const Button = styled.div`
	border: none;
	font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-style: normal;
	font-stretch: normal;
	background-repeat: no-repeat;
	background-position: center;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	${({ cursor }) => (cursor ? "cursor:" + cursor + ";" : "cursor: pointer;")}
	${({ textAlign }) => (textAlign ? "text-align:" + textAlign + ";" : "text-align: center;")}
	${({ top }) => (top ? "top:" + top + ";" : "")}
	${({ left }) => (left ? "left:" + left + ";" : "")}
	${({ right }) => (right ? "right:" + right + ";" : "")}
	${({ bottom }) => (bottom ? "bottom:" + bottom + ";" : "")}
	${({ position }) => (position ? "position:" + position + ";" : "")}
	${({ borderRadius }) => (borderRadius ? "border-radius:" + borderRadius + ";" : "border-radius: 4px;")}
	${({ alignItems }) => (alignItems ? "align-items:" + alignItems + ";" : "center;")}
	${({ align }) => (align ? "align:" + align + ";" : "")}
	${({ lineHeight }) => (lineHeight ? "line-height:" + lineHeight + ";" : "line-height: 1.23;")}
	${({ fontWeight }) => (fontWeight ? "font-weight:" + fontWeight + ";" : "font-weight: normal;")}
	${({ objectFit }) => (objectFit ? "object-fit:" + objectFit + ";" : "")}
	${({ display }) => (display ? "display:" + display + ";" : "")}
	${({ transform }) => (transform ? "transform:" + transform + ";" : "")}
	${({ textTransform }) => (textTransform ? "text-transform:" + textTransform + ";" : "")}
	${({ float }) => (float ? "float:" + float + ";" : "")}
	${({ letterSpacing }) => (letterSpacing ? "leter-spacing:" + letterSpacing + ";" : "letter-spacing: -0.3px;")}
	${({ fontSize }) => (fontSize ? "font-size:" + fontSize + "px;" : "font-size: 13px;")}
	${({ marginRight }) =>  (marginRight ? `margin-right: ${isNaN(Number(marginRight)) ? marginRight : `${marginRight}px`};` : "")}
	${({ marginLeft }) =>  (marginLeft ? `margin-left: ${isNaN(Number(marginLeft)) ? marginLeft : `${marginLeft}px`};` : "")}
	${({ marginTopPercentual }) => (marginTopPercentual ? "margin-top:" + marginTopPercentual + ";" : "")}
	${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + "px;" : "")}
	${({ marginBottom }) => (marginBottom ? "margin-bottom:" + marginBottom + "px;" : "")}
	${({ height }) => (height ? "height:" + height + ";" : "height: 30px;")}
	${({ width }) => (width ? "width:" + width + ";" : "")}
	${({ padding }) => (padding ? "padding:" + padding + ";" : "")}
	${({ paddingTop }) => (paddingTop ? "padding-top:" + paddingTop + "px;" : "padding-top: 7px;")}
	${({ paddingBottom }) => (paddingBottom ? "padding-bottom:" + paddingBottom + ";" : "")}
	${({ paddingLeft }) => (paddingLeft ? "padding-left:" + paddingLeft + ";" : "")}
	${({ paddingRight }) => (paddingRight ? "padding-right:" + paddingRight + ";" : "")}
	${({ bgColor }) => (bgColor ? "background-color:" + bgColor + ";" : "background-color: #479A5F;")}
	${({ bgImage }) => (bgImage ? "background-image: url(" + bgImage + ");" : "")}
	${({ bgPosition }) => (bgPosition ? "background-position: " + bgPosition + ";" : "")}
	${({ bgSize }) => (bgSize ? "background-size:" + bgSize + ";" : "")}
	${({ color }) => (color ? "color:" + color + ";" : "color: #ffffff;")}
	${({ justifyContent }) => (justifyContent ? "justify-content:" + justifyContent + ";" : "")}
	${({ borderColor }) => (borderColor ? "border-color:" + borderColor + ";" : "")}
	&:hover {
		${({ bgColorHover }) => (bgColorHover ? "background-color:" + bgColorHover + ";" : "")}
		${({ colorHover }) => (colorHover ? "color:" + colorHover + ";" : "")}
		${({ bgImageHover }) => (bgImageHover ? "background-image: url(" + bgImageHover + ");" : "")}
		${({ transformHover }) => (transformHover ? "transform:" + transformHover + ";" : "")}
		${({ cursorChange }) => (cursorChange ? "cursor:" + cursorChange + ";" : "")}
	}
`;

export default ({ 
	onClick, id, transform, cursor, textAlign, 
	justifyContent, colorHover, align, textTransform, 
	transformHover, paddingRight, paddingLeft, top, left, 
	right, bottom, position, borderRadius, paddingBottom, 
	alignItems, fontWeight, lineHeight, objectFit, float, 
	display, marginLeft, marginRight, marginTop, marginBottom, 
	fontSize, bgColorHover, height, width, color, bgColor, 
	bgImage, bgPosition, bgSize, bgImageHover, paddingTop, 
	title,marginTopPercentual,padding, cursorChange, borderColor 
}) => {
	return(
		<Button  
			id={id}
			onClick={onClick} 
			marginLeft={marginLeft} 
			marginRight={marginRight} 
			marginTop={marginTop}
			marginBottom={marginBottom}
			width={width}
			height={height}
			color={color}
			bgSize={bgSize}
			bgColor={bgColor}
			bgImage={bgImage}
			bgPosition={bgPosition}
			bgImageHover={bgImageHover}
			float={float}
			display={display}
			transform={transform}
			textTransform={textTransform}
			transformHover={transformHover}
			padding={padding || (!width ? '10px' : undefined)}
			paddingTop={paddingTop}
			paddingBottom={paddingBottom}
			paddingLeft={paddingLeft}
			paddingRight={paddingRight}
			bgColorHover={bgColorHover}
			colorHover={colorHover}
			fontSize={fontSize}
			objectFit={objectFit}
			fontWeight={fontWeight}
			lineHeight={lineHeight}
			alignItems={alignItems}
			align={align}
			borderRadius={borderRadius}
			position={position}
			top={top}
			left={left}
			right={right}
			bottom={bottom}
			textAlign={textAlign}
			justifyContent={justifyContent}
			cursor={cursor}
			marginTopPercentual={marginTopPercentual}
			cursorChange = {cursorChange}
			borderColor={borderColor}
		>
			{title}
		</Button>
	)
}