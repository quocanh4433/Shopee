import { ProductType, ProductListType, ProductListConfigType } from 'src/types/product.type';
import { SuccessResponseType } from 'src/types/utils.type';
import https from 'src/utils/https';

const URL = 'products';
const productApi = {
  getProducts(params: ProductListConfigType) {
    return https.get<SuccessResponseType<ProductListType>>(URL, {
      params
    });
  },
  getProductDetail(id: string) {
    return https.get<SuccessResponseType<ProductType>>(`${URL}/${id}`);
  }
};

export default productApi;
