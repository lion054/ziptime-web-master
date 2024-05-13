import React, { useState, useEffect } from "react";
import Container from "./Container";
import Label from './Label';
import Input from './Input';
import Button from './Button';
import ReactPaginate from 'react-paginate';
import trashCan from "../assets/images/lixeira.svg";

function UserList(props)  {
    const { 
        pageUpdateMethod,
        onAddPerson,
        onRemovePerson,
        userList = [], 
        showBox, 
        count = 0, 
        limit = 10, 
        width='45%', 
        marginTop='19px',
        marginRight,
        marginBottom,
        title,
        canEdit = true,
        children,
        placeholder
    } = props;

    const [list, setList] = useState(userList);
    const [addingUser, setAddingUser] = useState(null);

    useEffect(() => {
        setList(userList);
    },[userList])

    const handlePageClick = (page) => {
        pageUpdateMethod(page)
    }

    const handleAddPerson = () => {

        const newList = [{ isEditing: true }, ...list];

        setList(newList)

    }

    const handleConfirmPerson = removingUser => {
        
        if (removingUser) {
            if (!removingUser.isEditing) { onRemovePerson(removingUser); }
            return setAddingUser(null); 
        }

        let newList = [...list];
        newList.splice(0,1);

        setList(newList);

        onAddPerson(addingUser);
        setAddingUser(null);
    }

    const handleAddingUser = event => {
        setAddingUser(event.target.value);

    }

    const totalPage = Math.ceil(count/limit);

    const isAdding = list.find(user => user.isEditing) != undefined;

    return (
        <Container 
            alignItems="center" 
            float="left" 
            width={width} 
            marginTop={marginTop} 
            marginRight={marginRight} 
            marginBottom={marginBottom}
        >
            <Label 
                width="calc(100% - 15px)" 
                float="left"
            >
                {title}
            </Label>

            {children}

            {showBox &&
                <Container 
                    display="flex"
                    flexDirection="row-reverse"
                    width="100%" 
                    float="left" 
                    height={`${list.length == 0 ? 38 : list.length * 38}px`}
                    maxHeight="190px" 
                    overflowX="hidden" 
                    overflowY="scroll" 
                    border="solid 1px #dbdbdb" 
                    marginBottom={count > limit ? "0px" : "20px"} 
                    scrollbarWidth="thin" 
                    scrollbarColor="rgb(197, 197, 197) rgb(295, 295, 295)"
                >
                    {canEdit &&
                        <Container
                            display="flex"
                            width="100px"
                            marginTop="5px"
                            marginRight="5px"
                        >
                            <Button
                                paddingTop="0"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                title={isAdding ? "CONFIRMAR" : "ADICIONAR"}
                                fontSize="16"
                                fontWeight="bold"
                                width="100px"
                                height="26px"
                                borderColor="#398439"
                                bgColor="#00a65a"
                                bgColorHover="#008d4c"
                                onClick={isAdding ? () => {handleConfirmPerson()} : handleAddPerson}
                            />
                        </Container>
                    }
                    <Container
                        display="flex"
                        width={canEdit ? "calc(100% - 100px)" : "100%"}
                        flexDirection="column"
                    >
                        {list.map(function(user, key){
                            return(
                                <Container 
                                    key={key}
                                    display="flex"
                                    width="100%"
                                    height="38px"
                                > 
                                    {canEdit && 
                                        <img 
                                            onClick={() => {handleConfirmPerson(user)}} 
                                            src={trashCan}
                                            style={{
                                                width: "10px", 
                                                marginLeft: "15px", 
                                                marginRight: "7px", 
                                                cursor: "pointer", 
                                                display: "flex"
                                            }}
                                        />
                                    }

                                    {user.isEditing &&
                                        <Container
                                            display="flex"
                                            width="100%"
                                        >
                                            <Input
                                                parentWidth="100%"
                                                marginBottom="0"
                                                noBtnClose
                                                border="0"
                                                paddingLeft="0"
                                                parentHeight="38px"
                                                onChange={handleAddingUser}
                                            />
                                        </Container>
                                    }

                                    {!user.isEditing &&
                                        <Label 
                                            width="100%" 
                                            display="flex"
                                            alignItems="center"
                                            fontWeight="normal"
                                        >
                                            {user.name}
                                        </Label>
                                    }

                                </Container>
                            );
                        })}

                        {list.length == 0 &&
                            <Label
                                width="90%"
                                float="left"
                                fontWeight= "normal"
                                fontStyle= "italic"
                                fontSize= "14px"
                                marginTop="9"
                                paddingLeft="15px"
                                color="#84848c"
                            >
                                {placeholder || "Nenhum colaborador selecionado, clique no botão de + para adicionar."}
                            </Label>
                        }
                    </Container>


                </Container>
            }

            {count > 0 && count > list.length &&
                <Container
                    display="inline-flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="30px"
                    marginTop="10px"
                    marginBottom="10px"
                >
                    <ReactPaginate
                        previousLabel={totalPage == 0 ? "" : "<"}
                        nextLabel={totalPage == 0 ? "" : ">"}
                        pageCount={totalPage}
                        pageRangeDisplayed={3}
                        breakLabel={'...'}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </Container>
            }
        </Container>
    )
}

export default UserList;