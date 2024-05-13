import React, { Component } from "react";
import styled from "styled-components";
// import DatePicker, { registerLocale } from "react-datepicker";
import MaskedInput from 'react-text-mask';
import SvgClose from './SvgClose';
import Label from './Label';
import moment from "moment";
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// import ptBR from "date-fns/locale/pt-BR";
// registerLocale("pt-BR", ptBR);
// import iconeExcluir from "assets/svg/icone-excluir.svg";
// import iconeEditar from "assets/svg/icone-editar.svg";
// import forwardArrow from "assets/svg/forward-arrow.svg";
import PasswordEye from "../components/PasswordEye";

const InputComp = styled.input`
    ${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + "px;": "")};
    ${({ marginLeft }) => (marginLeft ? "margin-left:" + marginLeft + "px;": "")};
    ${({ marginRight }) => (marginRight ? "margin-right:" + marginRight + "px;": "")};
    ${({ marginBottom }) => (marginBottom ? "margin-bottom:" + marginBottom + "px;" : "")}
    ${({ maxLength }) => (maxLength ? "max-length:" + maxLength + "px;": "")};
    font-size: 14px;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.4px;
    ${({ textAlign }) => (textAlign ? "text-align:" + textAlign + ";": "left;")};
    object-fit: contain;
    mix-blend-mode: undefined;
    ${({ min }) => (min ? "min:" + min + ";" : "")}
    ${({ max }) => (max ? "max:" + max + ";" : "")}
    ${({ step }) => (step ? "step:" + step + ";" : "")}
    ${({ pattern }) => (pattern ? "pattern:" + pattern + ";" : "")}
    ${({ position }) => (position ? "position:" + position + ";" : "")}
    ${({ disabled }) => (disabled ? "color: none;" : "color: #616670;")}
    ${({ bgColor }) => (bgColor ? "background-color:" + bgColor + ";" : "background-color: #fff;")}
    ${({ border }) => (border ? "border:" + border + ";" : "border: solid 1px #dbdbdb;")}
    ${({ borderRadius }) => (borderRadius ? "border-radius:" + borderRadius + ";" : "border-radius: 0px;")}
    ${({ padding }) => (padding ? "padding:" + padding + ";" : "padding: 4px 16px;")}
    ${({ paddingLeft }) => (paddingLeft ? "padding-left:" + paddingLeft + "px;" : "padding-left: 16px;")}
    ${({ paddingRight }) => (paddingRight ? "padding-right:" + paddingRight + "px;" : "padding-right: 16px;")}
    ${({ height }) => (height ? "height:" + height + "px;" : "height: 38px;")}
    ${({ width }) => (width ? "width:" + width + ";" : "")}
    ${({ maxWidth }) => (maxWidth ? "max-width:" + maxWidth + ";" : "")}
    ${({ float }) => (float ? "float:" + float + ";" : "")}
    ${({ textTransform }) => (textTransform ? "text-transform:" + textTransform + ";" : "")}
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    ::-webkit-input-placeholder {
        font-style: italic;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #928f8f;
        ${({ textTransformPlaceholder }) => (textTransformPlaceholder ? "text-transform:" + textTransformPlaceholder + ";" : "text-transform: none;")}
    }
    ::-moz-placeholder {
        font-style: italic;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #928f8f;
        ${({ textTransformPlaceholder }) => (textTransformPlaceholder ? "text-transform:" + textTransformPlaceholder + ";" : "text-transform: none;")}
    }
    :-ms-input-placeholder {
        font-style: italic;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #928f8f;
        ${({ textTransformPlaceholder }) => (textTransformPlaceholder ? "text-transform:" + textTransformPlaceholder + ";" : "text-transform: none;")}
    }
    :-moz-placeholder {
        font-style: italic;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #928f8f;
        ${({ textTransformPlaceholder }) => (textTransformPlaceholder ? "text-transform:" + textTransformPlaceholder + ";" : "text-transform: none;")}
    }
    &:hover {
        ${({ cursorChange }) => (cursorChange ? "cursor:" + cursorChange + ";" : "")}
    }
    &:focus {
        border-color: #3c8dbc;
        outline-style: none;
    }
`;

const Checkbox = styled.input`
    width: 15px;
    height: 15px;
    ${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + "px;": "")}
    ${({ marginLeft }) => (marginLeft ? "margin-left:" + marginLeft + "px;": "")}
    object-fit: contain;
    ${({ display }) => (display ? `display: ${display};`: "")}
    ${({ float }) => (float ? `${float == '' ? float : `float: ${float};`}` : "float: left;")}
    position: relative;
    border-radius: 4px;
    border: solid 1px #cccaca;
    background-image: radial-gradient(circle at 0 0, #ebeced, #ffffff);
`;

class Input extends Component {

    state = {
        inputType: this.props.inputType
    }

    constructor(props) {
        super(props);
        this.basicField = React.createRef();
        this.dateField = React.createRef();
        this.maskedField = React.createRef();
    }

    handleClear = () => {
        let { type="normal", handleClear } = this.props;

        let fieldDict = {
            normal: this.basicField,
            date: this.dateField,
            masked: this.maskedField
        };

        fieldDict[type].current.value = "";
        if(handleClear) { handleClear(); }
        
    }

    handleShowPwd = () => {
        let { inputType } = this.state;
        
        inputType = inputType == "password" ? "text" : "password";
        
        this.setState({ inputType })
    }

    render() {
        let { inputType } = this.state;
        let { type="normal" } = this.props;

        return (
            <div style={{
                position:"relative", 
                width: this.props.parentWidth, 
                height: this.props.parentHeight,
                marginRight: this.props.marginRight,
                marginTop: this.props.marginTop,
                marginLeft: this.props.marginLeft,
                marginBottom: this.props.marginBottom
            }}>
                {type == "checkbox" &&
                    <Checkbox 
                        type="checkbox"
                        checked={this.props.checked}
                        onChange={this.props.onChange}
                        onClick={this.props.onClick}
                        marginTop={this.props.marginTop}
                        marginLeft={this.props.marginLeft}
                        disabled={this.props.disabled}
                    />
                }
                {type == "radio" &&
                    <div>
                    {(this.props.options || []).map((option,index) => {
                        return (
                            <div style={{display:'flex'}} key={index}>
                                <Checkbox 
                                    float=''
                                    type="radio"
                                    name={this.props.radioName}
                                    checked={option.value == this.props.selectedRadio}
                                    value={option.value}
                                    onChange={this.props.onChange}
                                    marginTop={this.props.marginTop}
                                    marginLeft={this.props.marginLeft}
                                    disabled={this.props.disabled}
                                />
                                <Label fontWeight="normal" fontSize="14px">{option.label}</Label>
                            </div>
                        )
                    })}
                    </div>
                }
                {type == "normal" &&
                    <InputComp 
                        type = {inputType}
                        autoComplete={this.props.autocomplete}
                        disabled = {this.props.disabled}
                        maxLength = {this.props.maxLength}
                        padding= {this.props.padding}
                        paddingLeft = {this.props.paddingLeft}
                        paddingRight = {this.props.paddingRight}
                        position = {this.props.position}
                        height = {this.props.height}
                        width = {this.props.width || (String(this.props.parentWidth).includes('%') ? '100%' : this.props.parentWidth)}
                        maxWidth = {this.props.maxWidth}
                        min= {this.props.min}
                        max= {this.props.max}
                        border = {this.props.border}
                        borderRadius = {this.props.borderRadius}
                        bgColor = {this.props.bgColor}
                        float = {this.props.float}
                        placeholder = {this.props.placeholder}
                        value = {this.props.value}
                        ref = {this.basicField}
                        onChange = {this.props.onChange}
                        onClick = {this.props.onClick}
                        onBlur = {this.props.onBlur}
                        onKeyDown = {this.props.onKeyDown}
                        onKeyUp = {this.props.onKeyUp}
                        defaultValue={this.props.defaultValue}
                        cursorChange={this.props.cursorChange}
                        textAlign={this.props.textAlign}
                        pattern={this.props.pattern}
                        step={this.props.step}
                        textTransform={this.props.textTransform}
                        textTransformPlaceholder={this.props.textTransformPlaceholder}
                    />
                }
                
                {type == "masked" && 
                    <MaskedInput
                        width={this.props.width || (String(this.props.parentWidth).includes('%') ? '100%' : this.props.parentWidth)}
                        maxWidth = {this.props.maxWidth}
                        disabled={this.props.disabled}
                        height= {this.props.height}
                        float= {this.props.float}
                        padding= {this.props.padding}
                        paddingLeft = {this.props.paddingLeft}
                        paddingRight = {this.props.paddingRight}
                        mask={this.props.mask}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        onInput={this.props.onInput}
                        ref={this.maskedField}
                        value={this.props.value}
                        guide={this.props.guide}
                        defaultValue={this.props.defaultValue}
                        cursorChange={this.props.cursorChange}
                        render={(ref, props) => {
                            return(
                                <InputComp ref={ref} {...props}/>
                            )}
                        }
                    />
                }
                {!["checkbox","radio"].includes(type) && !this.props.noBtnClose && !this.props.disabled &&
                    <SvgClose 
                        onClick={() => {this.handleClear()}} 
                        image={this.props.imageSvg} 
                        stylesheet={{
                            position: this.props.positionSvg || 'absolute', 
                            float: this.props.floatSvg, 
                            marginLeft: this.props.marginLeftSvg, 
                            marginRight: this.props.marginRightSvg, 
                            marginTop: this.props.marginTopSvg, 
                            zIndex: this.props.zIndex, 
                            top: this.props.topSvg || '25%', 
                            left: this.props.leftSvg,
                            right: this.props.rightSvg || '10px'
                        }}
                    />
                }
                
                {(this.props.inputType == "password" && !this.props.hideEye) &&
                    <PasswordEye 
                        onClick={this.handleShowPwd} 
                        stylesheet={{position:'absolute', top: this.props.eyeTop || '25%', right: this.props.eyeRight || '5%'}}
                    />
                }
            </div>
        );
    }
}

/*
    {type == "date" && 
                    <DatePicker 
                        locale="pt-BR"
                        timeFormat = {this.props.timeFormat}
                        dateFormat = {this.props.dateFormat}
                        timeIntervals= {this.props.timeIntervals}
                        selected = {this.props.selected ? moment(this.props.selected).toDate() : undefined}
                        disabled = {this.props.disabled}
                        inline = {this.props.inline}
                        showTimeSelect = {this.props.showTimeSelect}
                        showTimeSelectOnly = {this.props.showTimeSelectOnly}
                        showMonthYearPicker = {this.props.showMonthYearPicker}
                        timeCaption = {this.props.timeCaption}
                        placeholderText = {this.props.placeholderText}
                        calendarContainer={this.props.calendarContainer}
                        customInput={
                            <MaskedInput
                                type="text"
                                mask={this.props.mask ? this.props.mask :(!this.props.maskedHour ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : !this.props.maskedDateHour ? [/\d/, /\d/, ":", /\d/, /\d/] : [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/," ", /\d/, /\d/, ":", /\d/, /\d/])} 
                                marginTop = {this.props.marginTop}
                                marginLeft = {this.props.marginLeft}
                                maxLength = {this.props.maxLength}
                                maxWidth = {this.props.maxWidth}
                                paddingLeft = {this.props.paddingLeft}
                                paddingRight = {this.props.paddingRight}
                                height = {this.props.height}
                                width = {this.props.width || this.props.parentWidth}
                                float = {this.props.float}
                                placeholder = {this.props.placeholder}
                                marginBottom = {this.props.marginBottom}
                                cursorChange={this.props.cursorChange}
                                render={(ref, props) => {
                                    return(
                                        <InputComp ref={ref} {...props}/>
                                    )}
                                }
                            />
                        }
                        onChange={e => {this.props.onChange(e)}}
                        ref={this.dateField}
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                    />
                }

 */

export default Input;