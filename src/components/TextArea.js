import styled from "styled-components";

const TextArea = styled.textarea` 
    ${({ width }) => (width ? "width:" + width + ";" : "width: 100%;")}
    ${({ height }) => (height ? "height:" + height + ";" : "height: 92px;")}
    border-radius: 0px;
    box-shadow: none;
    background-color: #ffffff;
    border: solid 1px #dbdbdb;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    text-align: left;
    padding-top: 10px;
    object-fit: contain;
    resize: none;
    mix-blend-mode: undefined;
    ${({ maxLength }) => (maxLength ? "max-length:" + maxLength + ";" : "")}
    ${({ float }) => (float ? "float:" + float + ";" : "")}
    ${({ paddingLeft }) => (paddingLeft ? "padding-left:" + paddingLeft + ";" : "padding-left: 16px;")}
    ${({ paddingRight }) => (paddingRight ? "padding-right:" + paddingRight + ";" : "")}
    ${({ paddingBottom }) => (paddingBottom ? "padding-bottom:" + paddingBottom + ";" : "")}
    ${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + ";" : "")}
    ${({ marginBottom }) => (marginBottom ? "margin-bottom:" + marginBottom + ";" : "margin-bottom: 29px;")}
    ${({ marginLeft }) => (marginLeft ? "margin-left:" + marginLeft + ";" : "")}
    ${({ wordWrap }) => (wordWrap ? "word-wrap:" + wordWrap + ";" : "word-wrap: normal;")}
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    ${({ disabled }) => (disabled ? "color: none;" : "color: #616670;")}
    ::-webkit-input-placeholder {
        font-style: italic;
        color: #928f8f;
    }
    ::-moz-placeholder {
        font-style: italic;
        color: #928f8f;
    }
    :-ms-input-placeholder {
        font-style: italic;
        color: #928f8f;
    }
    :-moz-placeholder {
        font-style: italic;
        color: #928f8f;
    }
    &:hover {
        ${({ cursorChange }) => (cursorChange ? "cursor:" + cursorChange + ";" : "")}
    }
    &:focus {
        border-color: #3c8dbc;
        outline-style: none;
    }
`;

export default TextArea;