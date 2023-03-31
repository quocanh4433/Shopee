import { Purchase, PurchaseListStatus } from 'src/types/purchase.type';
import { SuccessResponseType } from 'src/types/utils.type';
import https from 'src/utils/https';

const URL = 'purchases';

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return https.post<SuccessResponseType<Purchase>>(`${URL}/add-to-cart`, body);
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return https.get<SuccessResponseType<Purchase[]>>(`${URL}`, {
      params
    });
  }
};

export default purchaseApi;
