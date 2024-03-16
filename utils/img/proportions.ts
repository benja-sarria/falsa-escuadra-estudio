export const caclulateWidthProportions = (
    imgId: string,
    imgSrc: string,
    heightVariable: string
) => {
    const imgMock = document.createElement("img");
    imgMock.src = imgSrc;
    imgMock.onload = function () {
        const img = document.querySelector(`#${imgId}`) as HTMLElement;
        if (img) {
            const width = (this as HTMLImageElement).naturalWidth;
            const height = (this as HTMLImageElement).naturalHeight;
            const parent = img.parentElement as HTMLElement;
            parent.style.removeProperty("min-height");
            parent.style.removeProperty("max-height");
            parent.style.minWidth = `calc(var(${heightVariable}) * ${
                width / height
            })`;

            parent.style.maxWidth = `calc(var(${heightVariable}) * ${
                width / height
            })`;
        }
    };
};

export const caclulateHeightProportions = (
    imgId: string,
    imgSrc: string,
    widthVariable: string
) => {
    const imgMock = document.createElement("img");
    imgMock.src = imgSrc;
    /*   const newimage = document.createElement("img");
    newimage.src = imgSrc; */
    imgMock.onload = function () {
        const img = document.querySelector(`#${imgId}`) as HTMLElement;
        if (img) {
            const width = (this as HTMLImageElement).naturalWidth;
            const height = (this as HTMLImageElement).naturalHeight;
            const parent = img.parentElement as HTMLElement;
            parent.style.removeProperty("min-width");
            parent.style.removeProperty("max-width");
            parent.style.minHeight = `calc(var(${widthVariable}) * ${
                height / width
            })`;

            parent.style.maxHeight = `calc(var(${widthVariable}) * ${
                height / width
            })`;
        }
    };
};

export const caclulateWidthPropsWithoutLoader = (
    img: HTMLImageElement,
    widthVariable: string
) => {
    if (img) {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const parent = img.parentElement as HTMLElement;
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        parent.style.minWidth = `calc(var(${widthVariable}) * ${
            width / height
        })`;

        parent.style.maxWidth = `calc(var(${widthVariable}) * ${
            width / height
        })`;
    }
};

export const caclulateHeightPropsWithoutLoader = (
    img: HTMLImageElement,
    widthVariable: string
) => {
    if (img) {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const parent = img.parentElement as HTMLElement;
        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.minHeight = `calc(var(${widthVariable}) * ${
            height / width
        })`;

        parent.style.maxHeight = `calc(var(${widthVariable}) * ${
            height / width
        })`;
    }
};

export const autoFigureItOutMeasureAfterLoad = (
    img: HTMLImageElement,
    measureVariable: string
) => {
    if (img) {
        const imgElement = img as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img.parentElement as HTMLElement;

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width <= height) {
            parent.style.minWidth = `var(${measureVariable})`;
            parent.style.maxWidth = `var(${measureVariable})`;
            parent.style.minHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;

            parent.style.maxHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;
            parent.classList.add("measured");
        } else {
            parent.style.minHeight = `var(${measureVariable})`;
            parent.style.maxHeight = `var(${measureVariable})`;
            parent.style.minWidth = `calc(var(${measureVariable}) * ${
                width / height
            })`;

            parent.style.maxWidth = `calc(var(${measureVariable}) * ${
                width / height
            })`;
            parent.classList.add("measured");
        }
    }
};

export const calculateWithMax = (
    img: HTMLImageElement,
    widthVariable: string,
    heightVariable: string
) => {
    if (img) {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const parent = img.parentElement as HTMLElement;

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width >= height) {
            parent.style.minWidth = `var(${widthVariable})`;
            parent.style.maxWidth = `var(${widthVariable})`;
            parent.style.minHeight = `calc(var(${widthVariable}) * ${
                height / width
            })`;

            parent.style.maxHeight = `calc(var(${widthVariable}) * ${
                height / width
            })`;
        } else {
            parent.style.minWidth = `calc(var(${heightVariable}) * ${
                width / height
            })`;
            parent.style.maxWidth = `calc(var(${heightVariable}) * ${
                width / height
            })`;
            parent.style.minHeight = `var(${heightVariable})`;

            parent.style.maxHeight = `var(${heightVariable})`;
        }
    }
};

export const autoFigureItOutMeasureLimit = (
    img: HTMLImageElement,
    measureVariable: string,
    maxHeightParameter?: string,
    inverted?: boolean
) => {
    if (img) {
        const imgElement = img as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img.parentElement as HTMLElement;

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (inverted ? width < height : width >= height) {
            parent.style.minWidth = `var(${measureVariable})`;
            parent.style.maxWidth = `var(${measureVariable})`;
            parent.style.minHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;

            parent.style.maxHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;
        } else {
            parent.style.minHeight = `var(${maxHeightParameter})`;
            parent.style.maxHeight = `var(${maxHeightParameter})`;
            parent.style.minWidth = `calc(var(${maxHeightParameter}) * ${
                width / height
            })`;

            parent.style.maxWidth = `calc(var(${maxHeightParameter}) * ${
                width / height
            })`;
            parent.classList.add("measured");
        }
    }
};

export const autoDetermineSize = (
    img: HTMLImageElement,
    widthVariable: string,
    heightVariable?: string
) => {
    if (img) {
        const imgElement = img as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img.parentElement as HTMLElement;

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width >= height) {
            parent.style.minWidth = `calc(var(${heightVariable}) * ${
                width / height
            })`;
            parent.style.maxWidth = `calc(var(${heightVariable}) * ${
                width / height
            })`;
            parent.style.minHeight = `var(${heightVariable})`;

            parent.style.maxHeight = `var(${heightVariable})`;
        } else {
            parent.style.minHeight = `calc(var(${widthVariable}) *  ${
                height / width
            })`;
            parent.style.maxHeight = `calc(var(${widthVariable}) * ${
                height / width
            })`;
            parent.style.minWidth = `var(${widthVariable})`;

            parent.style.maxWidth = `var(${widthVariable})`;
            parent.classList.add("measured");
        }
    }
};
