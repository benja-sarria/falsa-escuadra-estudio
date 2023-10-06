import { ProjectDataInterface } from "@/types/projectTypes";
import { Product } from "@prisma/client";

export class ParsedProjectDTO {
    parsed: any;

    constructor(projectData: Product) {
        this.parsed = {
            ...projectData,
            createdAt: new Date(projectData.createdAt)
                .toLocaleDateString("en-GB")
                .toString(),
            updatedAt: new Date(projectData.updatedAt)
                .toLocaleDateString("en-GB")
                .toString(),
        };
    }
}
