import prisma from "../../db/singleton";

import {
    Prisma,
    PrismaClient,
    Product,
    ProductPhotos,
    ProductTypes,
} from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import { ProductTypeQueryParamsType } from "@/types/productTypesTypes";

export class ProductTypesPrismaDao {
    db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
    constructor() {
        this.db = prisma;
    }

    async getProductTypes(queryParams: ProductTypeQueryParamsType | undefined) {
        const productTypes: ProductTypes[] =
            await this.db.productTypes.findMany({
                where: queryParams ? { ...queryParams } : {},
            });
        console.log("DAO-TYPE", productTypes);
        if (!productTypes) {
            throw new Error("There was a problem querying your data");
        }

        return productTypes;
    }
}
