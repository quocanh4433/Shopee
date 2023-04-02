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
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return https.post<SuccessResponseType<Purchase[]>>(`${URL}/buy-products`, body);
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return https.put<SuccessResponseType<Purchase>>(`${URL}/update-purchase`, body);
  },
  deletePurchase(purchaseIds: string[]) {
    return https.delete<SuccessResponseType<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    });
  }
};

export default purchaseApi;
