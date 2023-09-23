import { PhotosObjectInterface } from "@/types/projectTypes";
//@ts-ignore
import sharp from "sharp";

export const saveToWebp = async (
    file: PhotosObjectInterface,
    index: number,
    folderPath: string
) => {
    try {
        const fileContents = file.baseSrc.split("base64,")[1];
        const buffer = Buffer.from(fileContents, "base64");
        const filenameEnding = `${index}.${"webp"}`;

        const fileName = `${folderPath}/${filenameEnding}`;

        const savedFile = await sharp(buffer)
            .resize({
                width: 1920,
                height: 1920,
                withoutEnlargement: true,
                fit: "inside",
            })
            .webp({ nearLossless: false, lossless: false, quality: 75 })
            .toFile(fileName);

        return {
            baseSrc: `${folderPath.replace(
                `${process.cwd()}`,
                ""
            )}/${filenameEnding}`,
            alt: file.alt,
            isPortrait: file.isPortrait,
        };
    } catch (error: any) {
        return { error: true, message: error.message };
    }
};
