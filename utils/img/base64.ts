import Compress from "compress.js";
const compress = new Compress();
export const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error: any) => reject(error);
    });

export const toBuffer = async (file: File) => {
    const compressed = await compress.compress([file], {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 0.75, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });
    console.log("[COMPRESSED]", compressed);
    return { data: compressed[0].data, prefix: compressed[0].prefix };
};
