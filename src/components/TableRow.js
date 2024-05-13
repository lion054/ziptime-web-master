import React from "react";
import styled from "styled-components";

export default styled.tr`
    ${({ display }) => (display ? `display: ${display};` : '')}
    ${({ width }) => (width ? `width: ${width};` : '')}
    ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')}
    ${({ height }) => (height ? `height: ${height};` : '')}
    border-bottom: ${({ noBorderBottom }) => (noBorderBottom ? "" : "1px solid #e4e4e4;")}
    text-align: ${({ align }) => (align ? align : "left")};
    cursor: ${({ cursor }) => (cursor ? "initial" : "pointer")};
    &:hover {
        ${({ bgColorHover }) => (bgColorHover ? "background-color:" + bgColorHover + ";" : "background-color: #f3f2f2")}
    }
`;