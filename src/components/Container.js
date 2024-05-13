import styled from "styled-components";

const Container = styled.div`
    ${({ scrollbarWidth }) => (scrollbarWidth ? "scrollbar-width:" + scrollbarWidth + ";" : "")}
    ${({ scrollbarColor }) => (scrollbarColor ? "scrollbar-color:" + scrollbarColor + ";" : "")}
    ${({ minWidth }) => (minWidth ? "min-width:" + minWidth + ";" : "")}
    ${({ minHeight }) => (minHeight ? "min-height:" + minHeight + ";" : "")}
    ${({ width }) => (width ? "width:" + width + ";" : "")}
    ${({ height }) => (height ? "height:" + height + ";" : "")}
    ${({ cursor }) => (cursor ? "cursor:" + cursor + ";" : "")}
    ${({ maxWidth }) => (maxWidth ? "max-width:" + maxWidth + ";" : "")}
    ${({ maxHeight }) => (maxHeight ? "max-height:" + maxHeight + ";" : "")}

    ${({ marginTop }) => (marginTop ? "margin-top:" + marginTop + ";" : "")}
    ${({ marginBottom }) => (marginBottom ? "margin-bottom:" + marginBottom + ";" : "")}
    ${({ marginLeft }) => (marginLeft ? "margin-left:" + marginLeft + ";" : "")}
    ${({ marginRight }) => (marginRight ? "margin-right:" + marginRight + ";" : "")}
    ${({ margin }) => (margin ? "margin:" + margin + ";" : "")}

    ${({ border }) => (border ? "border:" + border + ";" : "")}
    ${({ borderStyle }) => (borderStyle ? "border-style:" + borderStyle + ";" : "")}
    ${({ borderColor }) => (borderColor ? "border-color:" + borderColor + ";" : "")}
    ${({ borderWidth }) => (borderWidth ? "border-width:" + borderWidth + ";" : "")}
    ${({ borderTop }) => (borderTop ? "border-top:" + borderTop + ";" : "")}
    ${({ borderBottom }) => (borderBottom ? "border-bottom:" + borderBottom + ";" : "")}
    ${({ borderLeft }) => (borderLeft ? "border-left:" + borderLeft + ";" : "")}
    ${({ borderRight }) => (borderRight ? "border-right:" + borderRight + ";" : "")}
    ${({ borderRadius }) => (borderRadius ? "border-radius:" + borderRadius + ";" : "")}
    ${({ borderTopLeftRadius }) => (borderTopLeftRadius ? "border-top-left-radius:" + borderTopLeftRadius + ";" : "")}
    ${({ borderTopRightRadius }) => (borderTopRightRadius ? "border-top-right-radius:" + borderTopRightRadius + ";" : "")}

    ${({ float }) => (float ? "float:" + float + ";" : "")}
    ${({ alignItems }) => (alignItems ? "align-items:" + alignItems + ";" : "")}
    ${({ align }) => (align ? "align:" + align + ";" : "")}
    ${({ alignSelf }) => (alignSelf ? "align-self:" + alignSelf + ";" : "")}
    ${({ verticalAlign }) => (verticalAlign ? "vertical-align:" + verticalAlign + ";" : "")}
    ${({ justifyContent }) => (justifyContent ? "justify-content:" + justifyContent + ";" : "")}
    ${({ display }) => (display ? "display:" + display + ";" : "")}
    ${({ transition }) => (transition ? "transition:" + transition + ";" : "")}
    ${({ willChange }) => (willChange ? "will-change:" + willChange + ";" : "")}

    ${({ padding }) => (padding ? "padding:" + padding + ";" : "")}
    ${({ paddingTop }) => (paddingTop ? "padding-top:" + paddingTop + ";" : "")}
    ${({ paddingBottom }) => (paddingBottom ? "padding-bottom:" + paddingBottom + ";" : "")}
    ${({ paddingRight }) => (paddingRight ? "padding-right:" + paddingRight + ";" : "")}
    ${({ paddingLeft }) => (paddingLeft ? "padding-left:" + paddingLeft + ";" : "")}

    ${({ flexDirection }) => (flexDirection ? "flex-direction:" + flexDirection + ";" : "")}
    ${({ flexWrap }) => (flexWrap ? "flex-wrap:" + flexWrap + ";" : "")}
    ${({ flexFlow }) => (flexFlow ? "flex-flow:" + flexFlow + ";" : "")}
    ${({ flexGrow }) => (flexGrow ? "flex-grow:" + flexGrow + ";" : "")}
    ${({ transform }) => (transform ? "transform:" + transform + ";" : "")}

    ${({ whiteSpace }) => (whiteSpace ? "white-space:" + whiteSpace + ";" : "")}
    ${({ textOverflow }) => (textOverflow ? "text-overflow:" + textOverflow + ";" : "")}
    ${({ overflow }) => (overflow ? "overflow:" + overflow + ";" : "")}
    ${({ overflowX }) => (overflowX ? "overflow-x:" + overflowX + ";" : "")}
    ${({ overflowY }) => (overflowY ? "overflow-y:" + overflowY + ";" : "")}

    ${({ objectFit }) => (objectFit ? "object-fit:" + objectFit + ";" : "")}
    ${({ boxShadow }) => (boxShadow ? "box-shadow:" + boxShadow + ";" : "")}
    ${({ zIndex }) => (zIndex ? "z-index:" + zIndex + ";" : "")}
    ${({ listStyleType }) => (listStyleType ? "list-style-type:" + listStyleType + ";" : "")}

    ${({ bgColor }) => (bgColor ? "background-color:" + bgColor + ";" : "")}
    ${({ bgOrigin }) => (bgOrigin ? "background-origin:" + bgOrigin + ";" : "")}
    ${({ bgRepeat }) => (bgRepeat ? "background-repeat:" + bgRepeat + ";" : "")}
    ${({ bgSize }) => (bgSize ? "background-size:" + bgSize + ";" : "")}
    ${({ bgPosition }) => (bgPosition ? "background-position:" + bgPosition + ";" : "")}
    ${({ bgPositionX }) => (bgPositionX ? "background-position-x:" + bgPositionX + ";" : "")}
    ${({ bgImage }) => (bgImage ? "background-image:" + bgImage + ";" : "")}
    ${({ bgTransform }) => (bgTransform ? "background-tranform:" + bgTransform + ";" : "")}
    ${({ bgClip }) => (bgClip ? "background-clip:" + bgClip + ";" : "")}

    ${({ position }) => (position ? "position:" + position + ";" : "")}
    ${({ order }) => (order ? "order:" + order + ";" : "")}
    ${({ top }) => (top ? "top:" + top + ";" : "")}
    ${({ bottom }) => (bottom ? "bottom:" + bottom + ";" : "")}
    ${({ right }) => (right ? "right:" + right + ";" : "")}
    ${({ left }) => (left ? "left:" + left + ";" : "")}
    
    ${({ color }) => (color ? "color:" + color + ";" : "")}
    ${({ textAlign }) => (textAlign ? "text-align:" + textAlign + ";" : "")}
    ${({ fontFamily }) => (fontFamily ? "font-family:" + fontFamily + ";" : "")}
    ${({ fontSize }) => (fontSize ? "font-size:" + fontSize + ";" : "")}
    ${({ fontWeight }) => (fontWeight ? "font-weight:" + fontWeight + ";" : "")}
    ${({ fontStyle }) => (fontStyle ? "font-style:" + fontStyle + ";" : "")}
    ${({ fontStretch }) => (fontStretch ? "font-stretch:" + fontStretch + ";" : "")}
    ${({ lineHeight }) => (lineHeight ? "line-height:" + lineHeight + ";" : "")}
    ${({ letterSpacing }) => (letterSpacing ? "letter-spacing:" + letterSpacing + ";" : "")}
    ${({ textDecoration }) => (textDecoration ? "text-decoration:" + textDecoration + ";" : "")}
    ${({ textTransform }) => (textTransform ? "text-tranform:" + textTransform + ";" : "")}

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    &:before {
        ${({ beforeContent }) => (beforeContent ? "content:" + beforeContent + ";" : "")}
        ${({ beforePosition }) => (beforePosition ? "position:" + beforePosition + ";" : "")}
        ${({ beforeLeft }) => (beforeLeft ? "left:" + beforeLeft + ";" : "")}
        ${({ beforeTransform }) => (beforeTransform ? "transform:" + beforeTransform + ";" : "")}
        ${({ beforeBottom }) => (beforeBottom ? "bottom:" + beforeBottom + ";" : "")}
        ${({ beforeWidth }) => (beforeWidth ? "width:" + beforeWidth + ";" : "")}
        ${({ beforeHeight }) => (beforeHeight ? "height:" + beforeHeight + ";" : "")}
        ${({ beforeBgColor }) => (beforeBgColor ? "background-color:" + beforeBgColor + ";" : "")}
        ${({ beforeBorder }) => (beforeBorder ? "border:" + beforeBorder + ";" : "")}
    }

    &:after {
        ${({ afterContent }) => (afterContent ? "content:" + afterContent + ";" : "")}
        ${({ afterPosition }) => (afterPosition ? "position:" + afterPosition + ";" : "")}
        ${({ afterLeft }) => (afterLeft ? "left:" + afterLeft + ";" : "")}
        ${({ afterTransform }) => (afterTransform ? "transform:" + afterTransform + ";" : "")}
        ${({ afterBottom }) => (afterBottom ? "bottom:" + afterBottom + ";" : "")}
        ${({ afterWidth }) => (afterWidth ? "width:" + afterWidth + ";" : "")}
        ${({ afterHeight }) => (afterHeight ? "height:" + afterHeight + ";" : "")}
        ${({ afterBgColor }) => (afterBgColor ? "background-color:" + afterBgColor + ";" : "")}
        ${({ afterBorder }) => (afterBorder ? "border:" + afterBorder + ";" : "")}
    }

    &:hover {
        ${({ bgColorHover }) => (bgColorHover ? "background-color:" + bgColorHover + ";" : "")}
        ${({ colorHover }) => (colorHover ? "color:" + colorHover + ";" : "")}
        ${({ filter }) => (filter ? "filter:" + filter + ";" : "")}
        ${({ cursorChange }) => (cursorChange ? "cursor:" + cursorChange + ";" : "")}
    }
`;

export default Container;