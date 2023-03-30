export interface ProductType {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListType {
  products: ProductType[];
  pagination: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export interface ProductListConfigType {
  page?: number | string;
  limit?: number | string;
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price';
  order?: 'asc' | 'desc';
  exclude?: string;
  rating_filter?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string;
  category?: string;
}
