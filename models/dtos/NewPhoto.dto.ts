import { PhotoDataInterface } from "@/types/projectTypes";

export class NewPhotoDTO {
    src: string;
    alt: string;
    productId: number;
    isPortrait: boolean;
    constructor(photoData: PhotoDataInterface) {
        this.src = photoData.src;
        this.alt = photoData.alt;
        this.productId = photoData.productId;
        this.isPortrait = photoData.isPortrait;
    }
}
