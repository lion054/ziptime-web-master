import styled from "styled-components";

export default styled.label` 
    object-fit: contain;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-stretch: normal;
    ${({ margin }) => (margin ? "margin:" + margin + ";" : "")}
    ${({ fontStyle }) => (fontStyle ? "font-style:" + fontStyle + ";" : "font-style: normal;")}
    ${({ top }) => (top ? "top:" + top + ";" : "")}
    ${({ left }) => (left ? "left:" + left + ";" : "")}
    ${({ right }) => (right ? "right:" + right + ";" : "")}
    ${({ height }) => (height ? "height:" + height + ";" : "height: auto;")}
    ${({ position }) => (position ? "position:" + position + ";" : "")}
    ${({ paddingRight }) => (paddingRight ? "padding-right:" + paddingRight + ";" : "")}
    ${({ paddingLeft }) => (paddingLeft ? "padding-left:" + paddingLeft + ";" : "")}
    ${({ paddingBottom }) => (paddingBottom ? "padding-bottom:" + paddingBottom + ";" : "")}
    ${({ paddingTop }) => (paddingTop ? "padding-top:" + paddingTop + ";" : "")}
    ${({ padding }) => (padding ? "padding:" + padding + ";" : "")}
    ${({ justifyContent }) => (justifyContent ? "justify-content:" + justifyContent + ";" : "")}
    ${({ fontSmoothing }) => (fontSmoothing ? "-webkit-font-smoothing:" + fontSmoothing + ";" : "")}
    ${({ letterSpacing }) => (letterSpacing ? "letter-spacing:" + letterSpacing + ";" : "letter-spacing: normal;")}
    ${({ lineHeight }) => (lineHeight ? "line-height:" + lineHeight + ";" : "line-height: normal;")}
    ${({ display }) => (display ? "display:" + display + ";" : "")}
    ${({ whiteSpace }) => (whiteSpace ? "white-space:" + whiteSpace + ";" : "")}
    ${({ textOverflow }) => (textOverflow ? "text-overflow:" + textOverflow + ";" : "")}
    ${({ textTransform }) => (textTransform ? "text-transform:" + textTransform + ";" : "")}
    ${({ overflow }) => (overflow ? "overflow:" + overflow + ";" : "")}
    ${({ marginBottom }) => (marginBottom ? `margin-bottom: ${marginBottom}${isNaN(Number(marginBottom)) ? ';' : 'px;'}` : "") }
    ${({ marginTop }) => (marginTop ? `margin-top: ${marginTop}${isNaN(Number(marginTop)) ? ';' : 'px;'}` : "")}
    ${({ marginLeft }) => (marginLeft ? `margin-left: ${marginLeft}${isNaN(Number(marginLeft)) ? ';' : 'px;'}` : "")}
    ${({ marginRight }) => (marginRight ? `margin-right: ${marginRight}${isNaN(Number(marginRight)) ? ';' : 'px;'}` : "")}
    ${({ textAlign }) => (textAlign ? "text-align:" + textAlign + ";" : "text-align: left;")}
    ${({ alignItems }) => (alignItems ? "align-items:" + alignItems + ";" : "")}
    ${({ textDecoration }) => (textDecoration ? "text-decoration:" + textDecoration + ";" : "")}
    ${({ fontSize }) => (fontSize ? "font-size:" + fontSize + ";" : "font-size: 13px;")}
    ${({ fontWeight }) => (fontWeight ? "font-weight:" + fontWeight + ";" : "font-weight: normal;")}
    ${({ float }) => (float ? "float:" + float + ";" : "")}
    ${({ width }) => (width ? "width:" + width + ";" : "")}
    ${({ color }) => (color ? "color:" + color + ";" : "color: #616670;")}
    ${({ bgColor }) => (bgColor ? "background-color:" + bgColor + ";" : "")}
    ${({ borderRadius }) => (borderRadius ? "border-radius:" + borderRadius + ";" : "")}
    ${({ cursor }) => (cursor ? "cursor:" + cursor + ";" : "cursor: auto")}
    ${({ maxWidth }) => (maxWidth ? "max-width:" + maxWidth + ";" : "")}
    ${({ minWidth }) => (minWidth ? "min-width:" + minWidth + ";" : "")}
    ${({ multilineEllipsis }) => (
        multilineEllipsis 
        ?
        `overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: ${multilineEllipsis};
        -webkit-box-orient: vertical; `
        : 
        ""

    )}
    &:hover {
        ${({ cursorChange }) => (cursorChange ? "cursor:" + cursorChange + ";" : "")}
    }
`;