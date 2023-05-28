import SortProductList from './components/SortProductList';
import AsideFilter from './components/AsideFilter';
import Product from './components/Product/Product';
import productApi from 'src/apis/product.api';
import { useQuery } from 'react-query';
import Pagination from 'src/components/Pagination';
import { ProductListConfigType } from 'src/types/product.type';
import categoryApi from 'src/apis/category.api';
import useQueryConfig from 'src/hooks/useQueryConfig';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export default function ProductList() {
  const queryConfig = useQueryConfig();

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfigType);
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories();
    }
  });

  return (
    <Fragment>
      <Helmet>
        <title>Shopee Việt Nam | Mua và Bán Trên Ứng Dụng Di Động Hoặc Website</title>
        <meta name='description' content='Trang chủ dự án Shopee' />
      </Helmet>
      <section className='container py-3 md:py-5'>
        {productsData && (
          <div className='gap-6 md:grid md:grid-cols-12'>
            <div className='md:col-span-3 xl:col-span-2'>
              <AsideFilter categories={categoriesData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='md:col-span-9 xl:col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-3 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </section>
    </Fragment>
  );
}
