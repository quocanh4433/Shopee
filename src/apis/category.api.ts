import { Category } from 'src/types/category.type';
import { SuccessResponseType } from 'src/types/utils.type';
import https from 'src/utils/https';

const URL = 'categories';

const categoryApi = {
  getCategories() {
    return https.get<SuccessResponseType<Category[]>>(URL);
  }
};

export default categoryApi;
