import React from "react";
import styled from "styled-components";

const Container = styled.div`
    ${({ stylesheet }) => stylesheet};

    cursor: pointer;
`;
const SvgClose = ({ onClick, stylesheet, image, svgStylesheet }) => (
    <Container onClick={onClick} stylesheet={stylesheet}>
        {!image &&
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9">
                <g 
                    fill="none" 
                    fillRule="evenodd" 
                    stroke={(svgStylesheet || {}).stroke || "#B0B2B4"} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5"
                >
                    <path d="M1 1l7 7M1 8l7-7"/>
                </g>
            </svg>
        }
        {image &&
            <img src={image} />
        }
    </Container>
);

export default SvgClose;
