export const parseTags = (text: string) => {
    const parts = text.split("|");
    return parts.map((part: string, index: number) => {
        return part.replaceAll(" ", "").startsWith("<b>") ||
            part.endsWith("</b>") ? (
            <strong key={`${index}`}>
                {part.replaceAll("<b>", "").replaceAll("</b>", "")}
            </strong>
        ) : (
            <span key={`${index}`}>{part}</span>
        );
    });
};
