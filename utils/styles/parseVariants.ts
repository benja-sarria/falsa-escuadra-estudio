/**
 * This functions takes a variant string array and return parsed styles
 * @param styleVariants String[]
 * @param stylesObj Styles Object
 * @returns Parsed String Style Variants
 */

export const parseVariants = (styleVariants: string[], stylesObj: any) => {
    const parsedVariants = styleVariants.map((style: string) => {
        return stylesObj[style];
    });

    return ` ${parsedVariants.toString().replaceAll(",", " ")}`;
};
