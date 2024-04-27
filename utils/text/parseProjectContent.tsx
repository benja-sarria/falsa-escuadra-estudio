import React from "react";

export const parseProjectContent = (content: string) => {
    const contentArray = content.split("|");

    const parsedContent = contentArray.map((textPiece) => {
        if (textPiece.includes("<b>")) {
            const boldNode = React.createElement(
                "b",
                { key: textPiece, id: Math.random() },
                textPiece.replaceAll("<b>", "").replaceAll("</b>", "")
            );

            return boldNode;
        }
        const regularNode = React.createElement(
            "p",
            { key: textPiece, id: Math.random() },
            textPiece
        );
        return regularNode;
    });

    return parsedContent;
};

export const parseBreakPoints = (text: string) => {
    const contentArray = text.split("</br>");
    const parsedArray = contentArray.map((text, index) => (
        <p key={index}>{text}</p>
    ));
    return parsedArray;
};
