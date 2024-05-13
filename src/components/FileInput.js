import React, { Component } from "react";
import styled from "styled-components";
import Container from "./Container";
import Button from "./Button";
import background from "../assets/images/background.png";

export default class InputFile extends Component {
    state = {
        fileType: Array.isArray(this.props.fileType) ? this.props.fileType : (this.props.fileType ? [this.props.fileType] : ["application/pdf"]),
        file: {
            name: "",
            types: Array.isArray(this.props.fileType) ? this.props.fileType : (this.props.fileType ? [this.props.fileType] : ["application/pdf"])
        },
        searchMsg: this.props.searchMsg || "PROCURAR"
    };
  
    handleClick = () => {
        this.input.click();
    }

    handleInput = input => {
        let { file, fileType } = this.state;
        
        if (input.target.files.length > 0) {
            let newfile = input.target.files[0];
            
            if (!fileType.includes(newfile.type)) { return this.props.onError(new Error('Tipo de arquivo incorreto.')); }

            if (typeof this.props.onOk == "function") { this.props.onOk(newfile); }
            
            this.setState({ file: newfile });
        }
    }

    render() {

        let { marginTop, width, height, hasButton=true, placeholder, bgImage, bgRepeat, bgSize, bgPosition } = this.props
        return (
            <div>
                <Container
                    width={width}
                    height={height}
                    border= "1px solid #ddd"
                    borderRadius= "4px"
                    display= "flex"
                    marginTop={marginTop}
                    cursor= "pointer"
                    bgImage={`url(${bgImage || background})`}
                    bgRepeat={bgRepeat}
                    bgSize={bgSize}
                    bgPosition={bgPosition}
                >
                    <Container
                        width={width}
                        height={height}
                        paddingRight="20px"
                        paddingTop="12px"
                        display="flex"
                        flexDirection= "row"
                        alignItems= "center"
                        borderRadius= "4px"
                        fontSize= "13px"
                        fontWeight= "normal"
                        fontStyle= "italic"
                        fontStretch= "normal"
                        lineHeight= "normal"
                        letterSpacing= "-0.3px"
                        textAlign= "left"
                        color="white"
                        alignItems="start"
                        justifyContent="flex-end"
                    >
                        { this.state.file.name.length > 0 ? this.state.file.name : placeholder == undefined ? "Selecione um arquivo PDF" : placeholder}
                    </Container>
                    
                    <input
                        style={{
                            position: "absolute", 
                            filter: "alpha(opacity=1)", 
                            MozOpacity: 0.01, opacity: 0.01,
                            width:width,// ? (String(width).includes('%') ? width : `${width}px`) : undefined,
                            height:height,// ? (String(height).includes('%') ? width : `${height}px`) : undefined,
                            bgImage:background
                        }}
                        ref={input => (this.input = input)}
                        onChange={this.handleInput}
                        type="file"
                    />
                    {hasButton &&
                        <Button
                            onClick={!this.props.disabled ? this.handleClick : undefined}
                            width= "100"
                            height= "25"
                            objectFit= "contain"
                            fontWeight= "normal"
                            lineHeight= "normal"
                            display= "flex"
                            alignItems= "center"
                            paddingBottom= "2px"
                            paddingTop="1"
                            marginTop= "-1"
                            marginRight= "0"
                            bgColor= "#616670"
                            fontSize= "11.5"
                            textAlign= "left"
                            color= "#ffffff"
                            justifyContent= "center"
                            title={this.state.searchMsg}
                        />
                    }
                </Container>
            </div>
        );
    }
}
