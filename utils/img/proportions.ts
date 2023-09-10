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

            console.log("[CALCULATE]", imgMock, imgId, parent);
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
        console.log("[CALCULATE-ID-SRC]", imgId, imgSrc, imgMock.naturalHeight);
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

            console.log("[CALCULATE]", imgMock, imgId, parent);
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
    console.log("[CALCULATE-COMPLEX]", img);
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
    console.log("[CALCULATE-COMPLEX]", img);
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

export const autoFigureItOutMeasure = (
    img: HTMLImageElement,
    measureVariable: string
) => {
    if (img) {
        const imgElement = img.querySelector("img") as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img as HTMLElement;

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width >= height) {
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

export const autoFigureItOutMeasureAfterLoad = (
    img: HTMLImageElement,
    measureVariable: string,
    modifier?: string | undefined
) => {
    console.log("CHECKING", img);

    if (img) {
        const imgElement = img as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img.parentElement as HTMLElement;
        console.log("[ELEMENT]", imgElement, width, height, parent);

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width <= height) {
            parent.style.minWidth = modifier
                ? `calc(var(${measureVariable}) * ${modifier})`
                : `var(${measureVariable})`;
            parent.style.maxWidth = modifier
                ? `calc(var(${measureVariable}) * ${modifier})`
                : `var(${measureVariable})`;
            parent.style.minHeight = modifier
                ? `calc(var(${measureVariable}) * ${
                      height / width
                  } * ${modifier})`
                : `calc(var(${measureVariable}) * ${height / width})`;

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
export const autoFigureItOutTwoSmallImgAfterLoad = (
    img: HTMLImageElement,
    measureVariable: string,
    modifier: string | undefined
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
            parent.style.minWidth = modifier
                ? `calc(var(${measureVariable}) * ${
                      width / height
                  } * ${modifier})`
                : `calc(var(${measureVariable}) * ${width / height})`;

            parent.style.maxWidth = modifier
                ? `calc(var(${measureVariable}) * ${
                      width / height
                  } * ${modifier})`
                : `calc(var(${measureVariable}) * ${width / height})`;

            parent.style.minHeight = modifier
                ? `calc(var(${measureVariable}) * ${modifier})`
                : `var(${measureVariable})`;

            parent.style.maxHeight = modifier
                ? `calc(var(${measureVariable}) * ${modifier})`
                : `var(${measureVariable})`;

            parent.classList.add("measured");
        } else {
            parent.style.minHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;
            parent.style.maxHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;
            parent.style.minWidth = `var(${measureVariable})`;

            parent.style.maxWidth = `var(${measureVariable})`;
            parent.classList.add("measured");
        }
    }
};

export const autoFigureItOutIconsAfterLoad = (
    img: HTMLImageElement,
    measureVariable: string,
    modifier?: string | undefined
) => {
    console.log("CHECKING", img);

    if (img) {
        const imgElement = img as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img.parentElement as HTMLElement;
        console.log("[ELEMENT]", imgElement, width, height, parent);

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width >= height) {
            parent.style.minWidth = modifier
                ? `calc(var(${measureVariable}) * ${modifier})`
                : `var(${measureVariable})`;
            parent.style.maxWidth = modifier
                ? `calc(var(${measureVariable}) * ${modifier})`
                : `var(${measureVariable})`;
            parent.style.minHeight = modifier
                ? `calc(var(${measureVariable}) * ${
                      height / width
                  } * ${modifier})`
                : `calc(var(${measureVariable}) * ${height / width})`;

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

export const caclulateHeightWithHolderLoader = (
    img: HTMLImageElement,
    widthVariable: string
) => {
    console.log("[CALCULATE-COMPLEX]", img);
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
        setTimeout(() => {
            if (parent.parentElement) {
                parent.parentElement.style.minHeight = `calc(var(${widthVariable}) * ${
                    height / width
                })`;

                parent.parentElement.style.maxHeight = `calc(var(${widthVariable}) * ${
                    height / width
                })`;
            }
        }, 250);
    }
};

export const autoFigureItOutMeasureLimit = (
    img: HTMLImageElement,
    measureVariable: string,
    maxHeightParameter?: string,
    doNotEscalate?: boolean
) => {
    if (img) {
        const imgElement = img as HTMLImageElement;
        const width = imgElement.naturalWidth;
        const height = imgElement.naturalHeight;
        const parent = img.parentElement as HTMLElement;
        console.log("[CALCULATING-LIMIT]", imgElement, doNotEscalate);

        parent.style.removeProperty("min-width");
        parent.style.removeProperty("max-width");
        parent.style.removeProperty("min-height");
        parent.style.removeProperty("max-height");
        if (width >= height) {
            parent.style.minWidth = `var(${measureVariable})`;
            parent.style.maxWidth = `var(${measureVariable})`;
            parent.style.minHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;

            parent.style.maxHeight = `calc(var(${measureVariable}) * ${
                height / width
            })`;
            if (
                parent.parentElement &&
                parent.parentElement.parentElement &&
                !doNotEscalate
            ) {
                parent.parentElement.style.minHeight = `calc(var(${measureVariable}) * ${
                    height / width
                })`;
                parent.parentElement.parentElement.style.minHeight = `calc(var(${measureVariable}) * ${
                    height / width
                })`;
            }
            parent.classList.add("measured");
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

export const autoFigureItOutHomeCarousel = (img: HTMLImageElement) => {
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
            parent.style.minWidth = `calc(100vh * ${width / height})`;

            parent.style.maxWidth = `calc(100vh * ${width / height})`;

            parent.style.minHeight = `100vh`;

            parent.style.maxHeight = `100vh`;

            parent.classList.add("measured");
        } else {
            parent.style.minHeight = `calc(100vw * ${height / width})`;
            parent.style.maxHeight = `calc(100vw * ${height / width})`;
            parent.style.minWidth = `100vw`;

            parent.style.maxWidth = `100vw`;
            parent.classList.add("measured");
        }
    }
};
