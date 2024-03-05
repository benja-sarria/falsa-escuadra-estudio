import { PhotoDataInterface } from "@/types/projectTypes";

export class NewPhotoDTO {
    src: string | null;
    alt: string;
    isPortrait: boolean;
    constructor(photoData: PhotoDataInterface) {
        this.src = photoData.src;
        this.alt = photoData.alt;
        this.isPortrait = photoData.isPortrait;
    }
}
