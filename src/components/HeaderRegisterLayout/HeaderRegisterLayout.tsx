import { Link, useMatch } from 'react-router-dom';
import { path } from 'src/constant/path';
import ShopeeIconOrange from 'src/assets/images/ShopeeIconOrange.svg';

export default function HeaderRegisterLayout() {
  const loginMatch = useMatch(path.login);
  const isLogin = Boolean(loginMatch);

  return (
    <header className='container py-3'>
      <nav className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Link to={path.home} className='w-20'>
            <img src={ShopeeIconOrange} alt='ShopeeIcon' />
          </Link>
          <h3 className='ml-3 hidden text-2xl md:block'>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h3>
        </div>
        <Link to='https://help.shopee.vn/portal' className='hidden text-orange md:block' target='_blank'>
          Bạn cần giúp đỡ?
        </Link>
      </nav>
    </header>
  );
}
