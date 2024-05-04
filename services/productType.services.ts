import { StandardAPIError } from "@/utils/api/standarizedErrors";
import { StandardSuccessResponse } from "@/utils/api/standarizedSuccessResponse";
import { ProductTypesPrismaDao } from "@/models/daos/productTypes.dao";
import { ProductTypeQueryParamsType } from "@/types/productTypesTypes";

export class ProductTypeServices {
    productTypeDao: ProductTypesPrismaDao;
    constructor(productTypeDao: ProductTypesPrismaDao) {
        this.productTypeDao = productTypeDao;
    }

    async getProductTypesService(
        queryParams: ProductTypeQueryParamsType | undefined
    ) {
        try {
            const productTypes = await this.productTypeDao.getProductTypes(
                queryParams
            );
            const standardResponse = new StandardSuccessResponse({
                data: productTypes,
            });
            return { ...standardResponse };
        } catch (error: any) {
            const standardError = new StandardAPIError(error.message);
            return { ...standardError };
        }
    }
}
