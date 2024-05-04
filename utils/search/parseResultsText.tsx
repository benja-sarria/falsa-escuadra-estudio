/**
 *
 * @param text The complete string for the title
 * @param search The part we have to highlight
 * @returns <><strong>{search}</strong> {...restOfText}</>
 */

export const parseResultsText = (
    text: string,
    search: string,
    shorten?: boolean
) => {
    const parsedText = text.toLowerCase();
    const parsedSearch = search.toLowerCase();
    if (!parsedText) {
        return "";
    }
    const indexOfText = parsedText.indexOf(parsedSearch);

    if (indexOfText === -1) {
        return `${text}${shorten ? "..." : ""}`;
    }
    const endIndexOfText = indexOfText + parsedSearch.length;

    return (
        <p>
            {`${text.slice(0, indexOfText)}`}
            <b>{`${text.slice(indexOfText, endIndexOfText)}`}</b>
            {`${text.slice(endIndexOfText)}${shorten ? "..." : ""}`}
        </p>
    );
};
