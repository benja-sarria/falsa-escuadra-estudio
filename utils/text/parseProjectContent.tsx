import React from "react";

export const parseProjectContent = (content: string) => {
    const contentArray = content.split("|");
    console.log(contentArray);
    const parsedContent = contentArray.map((textPiece) => {
        if (textPiece.includes("<b>")) {
            const boldNode = React.createElement(
                "b",
                {},
                textPiece.replaceAll("<b>", "").replaceAll("</b>", "")
            );

            return boldNode;
        }
        return textPiece;
    });

    console.log(parsedContent);
    return parsedContent;
};

export const parseBreakPoints = (text: string) => {
    const contentArray = text.split("</br>");
    const parsedArray = contentArray.map((text, index) => (
        <p key={index}>{text}</p>
    ));
    return parsedArray;
};
