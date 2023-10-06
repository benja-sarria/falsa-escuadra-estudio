import { ProjectDataInterface } from "@/types/projectTypes";

export class NewProjectDTO {
    title: string;
    content: string;
    published: boolean;
    updatedById: number;
    productTypeId: number;
    constructor(projectData: ProjectDataInterface) {
        this.title = projectData.title;
        this.content = projectData.content;
        this.published = false;
        this.updatedById = projectData.updatedById;
        this.productTypeId = projectData.productTypeId;
    }
}
