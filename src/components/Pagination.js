import React from "react";
import ReactPaginate from "react-paginate";
import Label from "./Label";
import Container from "./Container";

export default function Pagination({
    handleNextPage = () => {},
    page = 0,
    totalPage = 0,
    totalItem = 0,
    fontSize,
    disableInitialCallback,
    dontShowTotalItemLabel = false
}) {
    return (
        <Container
            display= "inline-flex"
            flexDirection= "column"
            justifyContent= "center"
            alignItems= "center"
            width= "100%"
            height= "40px"
            marginTop= "50px"
            marginBottom= "20px"
        > 
            {!dontShowTotalItemLabel &&
                <Label
                    fontSize={fontSize || "14px"} 
                    fontWeight="normal" 
                    textAlign="center" 
                    margin="0"
                >
                    {totalItem} resultado(s) encontrado(s)
                </Label>
            }

            <ReactPaginate
                pageCount={totalPage}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                previousLabel={totalPage == 0 ? "" : "<"}
                nextLabel={totalPage == 0 ? "" : ">"}
                breakLabel="..."
                onPageChange={handleNextPage}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                initialPage={page}
                disableInitialCallback={disableInitialCallback}
            />
        </Container>
    );
};