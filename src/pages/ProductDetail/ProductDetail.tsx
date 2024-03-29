import { useMutation, useQuery, useQueryClient } from 'react-query';
import DOMPurify from 'dompurify';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productApi from 'src/apis/product.api';
import ProductRating from 'src/components/ProductRating';
import { ProductListConfigType, ProductType } from 'src/types/product.type';
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils';
import Product from '../ProductList/components/Product';
import QuantityController from 'src/components/QuantityController';
import purchaseApi from 'src/apis/purchase.api';
import { toast } from 'react-toastify';
import { purchasesStatus } from 'src/constant/purchase';
import { path } from 'src/constant/path';
import { convert } from 'html-to-text';
import { Helmet } from 'react-helmet-async';

export default function ProductDetail() {
  const { nameId } = useParams();
  const id = getIdFromNameId(nameId as string);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  });

  const product = productDetailData?.data.data;
  const queryConfig: ProductListConfigType = { limit: '20', page: '1', category: product?.category._id };

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig);
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  });

  const addToCartMutation = useMutation(purchaseApi.addToCart);

  const [buyCount, setBuyCount] = useState(1);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
  const [activeImage, setActiveImage] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  );

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const chooseActive = (img: string) => {
    setActiveImage(img);
  };

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const image = imageRef.current as HTMLImageElement;
    const { naturalHeight, naturalWidth } = image;
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX);
    const offsetY = event.pageY - (rect.y + window.scrollY);

    const top = offsetY * (1 - naturalHeight / rect.height);
    const left = offsetX * (1 - naturalWidth / rect.width);
    image.style.width = naturalWidth + 'px';
    image.style.height = naturalHeight + 'px';
    image.style.maxWidth = 'unset';
    image.style.top = top + 'px';
    image.style.left = left + 'px';
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style');
  };

  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 });
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] });
        }
      }
    );
  };

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string });
    const purchase = res.data.data;
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    });
  };

  if (!product) return null;
  return (
    <Fragment>
      <Helmet>
        <title>{product.name}</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <div className='container py-4 md:py-6'>
        <div className='bg-white p-3 shadow md:p-4'>
          <div className='gap-9 md:grid md:grid-cols-12'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className=' absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage;
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange' />}
                    </div>
                  );
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-lg font-medium uppercase md:text-xl'>{product.name}</h1>
              <div className='mt-4 flex items-center md:mt-8'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-sm text-orange md:text-base'>
                    {product.rating}
                  </span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='fill-orange text-orange h-4 w-4'
                    nonActiveClassname='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span className='text-sm md:text-base'>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-xs text-gray-500 md:text-base'>Đã bán</span>
                </div>
              </div>
              <div className='mt-4 flex items-center bg-gray-50 px-3 py-2 md:mt-8 md:px-5 md:py-4'>
                <div className='text-sm text-gray-500 line-through md:text-base'>
                  ₫{formatCurrency(product.price_before_discount)}
                </div>
                <div className='ml-2 text-xl font-medium text-orange md:ml-3 md:text-3xl'>
                  ₫{formatCurrency(product.price)}
                </div>
                <div className='ml-2 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white md:ml-4'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-4 flex items-center md:mt-8'>
                <div className='text-xs capitalize text-gray-500 md:text-base'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                <div className='ml-6 text-xs text-gray-500 md:text-base'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-4 flex items-center md:mt-8'>
                <button
                  onClick={handleAddToCart}
                  className='mr-[10px] flex h-9 items-center justify-center rounded-sm border border-orange bg-orange/10 px-3 text-xs capitalize text-orange shadow-sm hover:bg-orange/5 md:h-12 md:px-5 md:text-base md:first-letter:h-12'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-1 h-4 w-4 fill-current stroke-orange text-orange md:h-5 md:w-5'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className='ml-4 flex h-9 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 text-xs capitalize text-white shadow-sm outline-none hover:bg-orange/90 md:h-12'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-2 text-sm capitalize text-slate-700 md:p-4 md:text-lg'>
            Mô tả sản phẩm
          </div>
          <div className='mx-4 mt-6 mb-4 text-xs leading-loose md:mt-12 md:text-sm'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
        <div className='mt-8'>
          <div className='uppercase text-gray-400'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
