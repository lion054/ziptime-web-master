import React from "react";
import styled from "styled-components";

export default styled.td`
  ${({ height }) => (height ? `height: ${height};` : "")};
  ${({ width }) => (width ? `width: ${width};` : "")};
  ${({ maxWidth }) => maxWidth ? `max-width: ${maxWidth};` : ''}
  ${({ textOverflow }) => textOverflow ? `text-overflow: ${textOverflow};` : ''}
  ${({ overflow }) => overflow ? `overflow: ${overflow};` : ''}
  ${({ display }) => display ? `display: ${display};` : ''}
  ${({ flexDirection }) => flexDirection ? `flex-direction: ${flexDirection};` : ''}
  ${({ justifyContent }) => justifyContent ? `justify-content: ${justifyContent};` : ''}
  ${({ whiteSpace }) => whiteSpace ? `white-space: ${whiteSpace};` : ''}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : "")};
  float: ${({ float }) => (float ? float : "")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "")};
  ${({ padding }) => (padding ? `padding: ${padding};` : "padding: 8px;")};
  ${({ paddingLeft }) => (paddingLeft ? `padding-left: ${paddingLeft};` : "padding-left: 17px !important;")};
  font-size: 13px;
  ${({ bold }) => (bold ? `font-weight: bold;` : `font-weight: regular`)};
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  ${({ color }) => (color ? `color: ${color};` : "color: #616670;")};
  ${({ align }) => align ? `text-align: ${align} !important` : "text-align: left !important"};
`;
