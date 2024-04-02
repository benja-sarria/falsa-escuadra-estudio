import { FieldNames } from "@/redux/features/website/contact-form-state-slice";

export interface QueryInterface {
    personalData: {
        name: string | null;
        lastName: string | null;
        city: string | null;
        phone: string | null;
    };
    query: {
        category: QueryCategoryInterface | null;
        materials: QueryMaterialsInterface[] | null;
        meassures: boolean;
        dimensions: QueryDimensionsInterface;
        complementaryInfo: QueryComplementaryInfoType[];
    };
    stage: ContactFormStageType;
    errors: { [key in FieldNames]: boolean } & { message?: string };
}

export interface QueryCategoryInterface {
    type: QueryCategoryTypeEnum;
    name: QueryCategoryNameEnum;
}

export interface QueryDimensionsInterface {
    height: number | null;
    width: number | null;
    depth: number | null;
}

export type ContactFormStageType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type QueryComplementaryInfoType = {
    type: "link" | "photo";
    resource: File | string;
};

export enum QueryCategoryTypeEnum {
    furnitureDesign = "furnitureDesign",
    interior = "interior",
    custom = "custom",
}

export enum QueryCategoryNameEnum {
    furnitureDesign = "Diseño de mobiliario",
    interior = "Diseño de interiores",
    custom = "Produccion de mobiliario a medida",
}

export interface QueryMaterialsInterface {
    type: QueryMaterialsTypeEnum;
    name: QueryMaterialsNameEnum;
}

export enum QueryMaterialsTypeEnum {
    iron = "iron",
    solidWood = "solidWood",
    laminatedWood = "laminatedWood",
    melamina = "melamina",
}

export enum QueryMaterialsNameEnum {
    iron = "Hierro",
    solidWood = "Madera maciza",
    laminatedWood = "Madera laminada",
    melamina = "Melamina",
}

export interface FormDataErrorInterface {
    name: QueryInterface.personalData.name;
    lastName: QueryInterface.personalData.lastName;
    meassures: QueryInterface.query.meassures;
    phone: QueryInterface.personalData.phone;
    category: QueryInterface.query.category;
    height: QueryInterface.query.dimensions.height;
    width: QueryInterface.query.dimensions.width;
    depth: QueryInterface.query.dimensions.depth;
    materials: QueryInterface.query.materials;
}
