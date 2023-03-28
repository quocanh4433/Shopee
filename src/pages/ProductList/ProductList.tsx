import SortProductList from './SortProductList';
import AsideFilter from './AsideFilter';
import Product from './Product/Product';
import useQueryParams from 'src/hooks/useQueryParam';
import productApi from 'src/apis/product.api';
import { useQuery } from 'react-query';
import { ProductType } from 'src/types/product.type';

export default function ProductList() {
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams);
    }
  });

  return (
    <section className='container bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
