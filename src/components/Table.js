import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import Label from "./Label";
import TableRow from "./TableRow";
import Container from "./Container";
import NotFound from "./NotFound";
import moment from "moment";

const Section = styled.section`
    width: ${({ width }) => (width ? width : "")};
    float: ${({ float }) => (float ? float : "")};
    display: ${({ display }) => (display ? display : "")};
    border: ${({ noborder }) => (noborder ? "1px solid #EBEBEB !important" : "")};
    ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop};` : "")};
    border: ${({ border }) => (border ? border : "")};
`;

const ModuleInner = styled.div`
    ${({ innerPadding }) => (innerPadding ? `padding: ${innerPadding}` : "padding: 0 !important")};
`;

const Center = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const TableContent = styled.table`
    ${({ margin }) => (margin ? `margin: ${margin}` : "")};
    width: 100%;
    border-collapse: collapse;
    tbody > ${TableRow}:last-child {
        border-bottom: 0;
    }
`;

const TableResponsive = styled.div`
    background-color: #FFFFFF;
    overflow: visible;
    ${({ border }) => (border ? `border-top: ${border}` : "")};
    ${({ marginLeft }) => (marginLeft ? `margin-left: ${marginLeft}` : "")};
    ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop}` : "")};
    ${props => props.outerPadding ? `
        padding: 22px 16px 15px 16px;
        background-color: #FFFFFF;
        ${({ boxShadow }) => (!boxShadow ? `box-shadow: 0.5px 0.9px 4px 0px rgba(1, 0, 2, 0.1);` : "")};
    ` : ""};
    border-radius: ${props => props.customRadius ? `${props.customRadius}` : "4px"};
`;

const Content = styled.p`
    margin: 0;
    font-size: 11px;
    color: #FFFFFF;
    text-align: left;
`;

const Title = styled.span`
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #84848c;
    ${({ indent }) => (indent ? `text-indent: ${indent}` : "")};
`;

export default function Table (props) {
    const [minValue, setMinValue] = useState(props.minValue || 0);

    const handleNextPage = (selected) => {
        props.handleNextPage(selected);
    }

    return (
        <div style={{width:'100%'}} >
            <div style={{width:'100%'}}>
                <Section
                    noborder={props.noborder}
                    margin={props.margin}
                    width={props.width}
                    float={props.float}
                    display={props.display}
                    marginTop={props.marginTopContainer}
                >
                    <ModuleInner innerPadding={props.innerPadding}>
                        <div>
                            <TableResponsive
                                customRadius={props.customRadius}
                                outerPadding={props.outerPadding}
                                marginLeft={props.marginLeft}
                                marginTop={props.marginTop}
                                border={props.borderTop}
                            >
                                {props.innerHeader &&
                                    <Container
                                        width="100%"
                                        noboxshadow
                                        noboxpadding
                                        margin="-3"
                                    >
                                        <Container
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Title>{props.innerHeader}</Title>

                                        </Container>
                                    </Container>
                                }

                                <TableContent>
                                    <thead style={{ display: "flex" }}>{props.tHead}</thead>
                                    <tbody>{props.tBody}</tbody>
                                </TableContent>
                                
                                {props.totalItem == 0 &&
                                    <NotFound 
                                        title={props.notFoundTitle}
                                    />
                                }
                            </TableResponsive>
                        </div>
                    </ModuleInner>
                </Section>
            </div>
          
            {props.pagination && props.totalItem > minValue &&
                <Center>
                    <Pagination
                        handleNextPage={handleNextPage}
                        totalPage={props.totalPage}
                        totalItem={props.totalItem}
                        fontSize={props.fontSize}
                        disableInitialCallback
                    />
                </Center>
            }

            {props.pagination && props.totalItem <= minValue &&
                <Center>
                    <Label 
                        marginBottom="20" 
                        marginTop="15" 
                        fontSize={props.fontSize ? props.fontSize : "15px"} 
                        fontWeight="normal"
                    >
                        {props.totalItem ? `${props.totalItem} resultado(s) encontrado(s)` : ''} 
                    </Label>
                </Center>
            }
        </div>
    );
}