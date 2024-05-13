import React from "react";
import Label from "./Label";
import Container from "./Container";

const SvgNotFound = () => (
    <svg width="600pt" height="650pt" version="1.1" viewBox="45 -30 600 650" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="m175.28 91.281h14v42h-14z"/>
            <path d="m175.28 203.28h14v42h-14z"/>
            <path d="m175.28 147.28h14v42h-14z"/>
            <path d="m175.28 371.28h14v42h-14z"/>
            <path d="m175.28 427.28h14v42h-14z"/>
            <path d="m511.28 245.28h14v42h-14z"/>
            <path d="m175.28 259.28h14v42h-14z"/>
            <path d="m511.28 189.28h14v42h-14z"/>
            <path d="m175.28 315.28h14v42h-14z"/>
            <path d="m204.4 28h-29.117v49.281h14v-35.281h15.117z"/>
            <path d="m252 518h42v14h-42z"/>
            <path d="m511.28 469.28h14v42h-14z"/>
            <path d="m511.28 357.28h14v42h-14z"/>
            <path d="m511.28 413.28h14v42h-14z"/>
            <path d="m518 129.92-10.078 10.078 3.3594 2.8008v32.48h14v-38.082z"/>
            <path d="m308 518h42v14h-42z"/>
            <path d="m196 518h42v14h-42z"/>
            <path d="m420 518h42v14h-42z"/>
            <path d="m511.28 301.28h14v42h-14z"/>
            <path d="m364 518h42v14h-42z"/>
            <path d="m476 518h42v14h-42z"/>
            <path d="m330.4 28h42v14h-42z"/>
            <path d="m418.88 50.961 10.082-10.082-12.883-12.879h-29.68v14h23.523z"/>
            <path d="m175.28 483.28h14v42h-14z"/>
            <path d="m508.47 120.2-9.8984 9.8984-29.699-29.699 9.8984-9.8984z"/>
            <path d="m218.4 28h42v14h-42z"/>
            <path d="m274.4 28h42v14h-42z"/>
            <path d="m468.31 80.602-9.8984 9.8984-29.699-29.699 9.8984-9.8984z"/>
            <path d="m459.2 140h30.801v14h-30.801z"/>
            <path d="m399.28 154h37.52v-14h-23.52v-23.52h-14z"/>
            <path d="m399.28 63.281h14v30.801h-14z"/>
        </g>
    </svg>
);

export default function NotFound({
    subtitle = "",
    title = "A sua pesquisa não gerou nenhum resultado, caso necessário, tente novamente utilizando outro termo.",
    noshadow,
    marginTop = "50px"
}) {

    return (
        <Container
            width= "100%"
            height= "150px"
            borderRadius= "4px"
            bgColor= "#ffffff"
            display= "flex"
            alignItems= "center"
            justifyContent= "center"
            flexDirection= "column"
            boxShadow= {noshadow ? "0.5px 0.9px 4px 0px rgba(1, 0, 2, 0.1)" : "" }
            marginTop={marginTop}
        >
            <SvgNotFound />
            <Label fontSize= "14px" textAlign= "center" color= "#84848c" width= "405px" marginTop= "19px">{title}</Label>
            <Label color="#616670" fontWeight="normal">{subtitle}</Label>
        </Container>
    );
}