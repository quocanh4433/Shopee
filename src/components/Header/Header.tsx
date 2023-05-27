import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { path } from 'src/constant/path';
import { AppContext } from 'src/context/app.context';
import Popover from '../Popover';
import { purchasesStatus } from 'src/constant/purchase';
import purchaseApi from 'src/apis/purchase.api';
import { formatCurrency, getAvatarUrl } from 'src/utils/utils';
import NavHeader from '../NavHeader';
import useSearchProducts from 'src/hooks/useSearchProducts';
import ShopeeIcon from 'src/assets/images/ShopeeIcon.svg';
import CartIcon from 'src/assets/images/CartIcon.svg';
import MenuIcon from 'src/assets/images/MenuIcon.svg';
import useLogout from 'src/hooks/useLogout';
import SubMenuUser from '../SubMenu/SubMenuUser';

const MAX_PURCHASES = 5;

export default function Header() {
  const { isAuthenticated, profile } = useContext(AppContext);
  const handleLogout = useLogout();
  const { onSubmitSearch, register } = useSearchProducts();

  // Khi chúng ta chuyển trang thì Header chỉ bị re-render
  // Chứ không bị unmount - mounting again
  // (Tất nhiên là trừ trường hợp logout rồi nhảy sang RegisterLayout rồi nhảy vào lại)
  // Nên các query này sẽ không bị inactive => Không bị gọi lại => không cần thiết phải set stale: Infinity

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  });

  const purchasesInCart = purchasesInCartData?.data.data;

  return (
    <header className='bg-[linear-gradient(-180deg,#f53d2d,#f63)] py-2 text-white sm:pb-4 sm:pt-1'>
      <div className='container'>
        <NavHeader />
        <div className='flex items-center justify-between'>
          <Link to={path.home} className='hidden sm:block sm:w-[14%] xl:w-[12%]'>
            <img src={ShopeeIcon} alt='ShopeeIcon' />
          </Link>
          <form className='relative w-[70%] overflow-hidden sm:w-[73%]' onSubmit={onSubmitSearch}>
            <div className='flex items-center rounded-sm bg-white p-0.5'>
              <input
                type='text'
                className='flex-grow border-none bg-transparent px-2 py-1 text-sm text-black outline-none sm:px-3 sm:py-2'
                placeholder='HÀNG QUỐC TẾ VOUCHER 100K'
                {...register('name')}
              />
              <button className='absolute right-0.5 w-[14%] rounded-sm bg-orange py-[0.3em] hover:opacity-90 sm:w-[10%] sm:py-[0.48em]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mx-auto h-4 w-4 sm:h-5 sm:w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='relative w-[8%] justify-self-end sm:w-[5%]'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                        <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                          <div className='flex-shrink-0'>
                            <img
                              src={purchase.product.image}
                              alt={purchase.product.name}
                              className='h-11 w-11 object-cover'
                            />
                          </div>
                          <div className='ml-2 flex-grow overflow-hidden'>
                            <div className='truncate'>{purchase.product.name}</div>
                          </div>
                          <div className='ml-2 flex-shrink-0'>
                            <span className='text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                      ))}
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='mr-3 text-xs capitalize text-gray-500'>Thêm hàng vào giỏ</div>
                        <Link
                          to={path.cart}
                          className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png'
                        alt='no purchase'
                        className='h-24 w-24'
                      />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/' className='relative'>
                <img className='mx-auto h-5 w-5 md:h-7 md:w-7' src={CartIcon} alt='CartIcon'></img>
                <span className='absolute top-[-8px] right-[-3px] rounded-full bg-white px-[6px] py-[1px] text-xs text-orange md:px-[9px] '>
                  {purchasesInCart?.length || 0}
                </span>
              </Link>
            </Popover>
          </div>
          <div className='block w-[8%] sm:hidden sm:w-[5%]'>
            {!isAuthenticated && (
              <Link to={path.login}>
                <img className='mx-auto h-7 w-7' src={getAvatarUrl(profile?.avatar)} alt='CartIcon'></img>
              </Link>
            )}
            {}
            {isAuthenticated && (
              <Popover
                className='flex cursor-pointer items-center py-1 hover:text-white/70'
                renderPopover={<SubMenuUser />}
              >
                <img className='mx-auto h-7 w-7' src={getAvatarUrl(profile?.avatar)} alt='CartIcon'></img>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
