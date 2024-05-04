import { PhotosObjectInterface } from "@/types/projectTypes";
//@ts-ignore
import sharp from "sharp";
import fs from "fs";

export const saveToWebp = async (
    fileSrc: { data: string; prefix: string },
    index: number,
    folderPath: string
) => {
    try {
        const buffer = Buffer.from(fileSrc.data, "base64");
        const filenameEnding = `${index}.${Date.now()}.${"webp"}`;

        const fileName = `${folderPath}/${filenameEnding}`;

        const savedFile = await sharp(buffer, { failOnError: false })
            .resize({
                width: 1920,
                height: 1920,
                withoutEnlargement: true,
                fit: "inside",
            })
            .webp({ quality: 75 })
            .toFile(fileName);

        return {
            baseSrc: `${folderPath.replace(
                `${process.cwd()}`,
                ""
            )}/${filenameEnding}`,
        };
    } catch (error: any) {
        console.log("ERROR", error);

        return { error: true, message: error.message };
    }
};

export const removePriorImg = (folderPath: string, identifier: string) => {
    const files = fs.readdirSync(folderPath);
    const foundFile = files.find((file: string) => {
        return file.split(".")[0] === identifier;
    });

    if (foundFile) {
        fs.unlinkSync(`${folderPath}/${foundFile}`);
    }
};
