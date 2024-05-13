import React from "react";
import styled from "styled-components";

export default styled.th`
  position: relative;
  ${({ paddingLeft }) => (paddingLeft ? `padding-left: ${paddingLeft};` : "padding-left: 17px !important;")};
  ${({ textAlign }) => (textAlign ? `text-align: ${textAlign};` : "text-align: left !important;")};
  ${({ justifyContent }) => (justifyContent ? `justify-content: ${justifyContent};` : "")};
  ${({ display }) => (display ? `display: ${display};` : "")};
  font-weight: bold !important;
  font-size: 14px !important;
  ${({ color }) => (color ? `color: ${color};` : "color: #84848c !important;")};
  // border-bottom: 0 !important;
  border-bottom: 1px solid #e4e4e4;
  // margin-bottom: 20px;
  ${({ width }) => (width ? "width:" + width + ";" : "")}
  ${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + ";" : "")}
  ${({ float }) => (float ? "float:" + float + ";" : "")}
  ${({ paddingRight }) => (paddingRight ? "padding-right:" + paddingRight + ";" : "")}
  ${({ padding }) => (padding ? "padding:" + padding + ";" : "padding: 8px;")}
`;