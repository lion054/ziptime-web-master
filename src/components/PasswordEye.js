import React from "react";
import styled from "styled-components";

const Container = styled.div`
    ${({ stylesheet }) => stylesheet};
    z-index: 50;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
`;

class PasswordEye extends React.Component {
    state = {
        isHover: false
    }

    handleOver = () => {
        this.setState({isHover: true});
    }

    handleOut = () => {
        this.setState({isHover: false});
    }

    render() {
        let { onClick, stylesheet, id } = this.props;
        return (
            <Container onMouseOver={this.handleOver} onMouseOut={this.handleOut} onClick={onClick} onDoubleClick={onClick} id={id} stylesheet={stylesheet}>
                <svg onClick={onClick} onDoubleClick={onClick} id={id} xmlns="http://www.w3.org/2000/svg" width="22" height="13">
                    <path 
                        fill={this.state.isHover ? "#45b9f5" : "#989FA9" } 
                        fillRule="evenodd" 
                        d="M11.472 12.998c-3.97.056-7.94-2.417-10.527-6.072C3.532 3.271 7.502.798 11.472.854c3.969-.056 7.939 2.417 10.526 6.072-2.587 3.655-6.557 6.128-10.526 6.072zM2.555 6.926c1.616 2.003 3.704 3.459 5.932 4.162a5.196 5.196 0 0 1-2.074-4.162c0-1.712.822-3.218 2.073-4.161-2.227.703-4.315 2.159-5.931 4.161zm8.917-3.929c-2.12 0-3.839 1.759-3.839 3.929s1.719 3.929 3.839 3.929 3.838-1.759 3.838-3.929-1.718-3.929-3.838-3.929zm2.986-.232a5.197 5.197 0 0 1 2.073 4.161 5.196 5.196 0 0 1-2.074 4.162c2.228-.703 4.315-2.159 5.932-4.162-1.616-2.002-3.704-3.458-5.931-4.161zm-2.986 6.317c-1.163 0-2.107-.965-2.107-2.156 0-.284.055-.555.152-.803.193.214.468.349.775.349.582 0 1.053-.482 1.053-1.078a1.09 1.09 0 0 0-.179-.601c.1-.015.202-.023.306-.023 1.163 0 2.106.965 2.106 2.156 0 1.191-.943 2.156-2.106 2.156z"
                    />
                    <rect id={id} width="22" height="13" fillOpacity="0" onClick={onClick} />
                </svg>
            </Container>
        );
    }
}

export default PasswordEye;