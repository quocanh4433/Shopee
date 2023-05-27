import { Link } from 'react-router-dom';
import { path } from 'src/constant/path';
import useLogout from 'src/hooks/useLogout';

export default function SubMenuUser() {
  const handleLogout = useLogout();
  return (
    <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
      <Link
        to={path.profile}
        className='block w-[180px] bg-white py-3 px-4 text-left text-sm hover:bg-slate-100 hover:text-orange'
      >
        Tài khoản của tôi
      </Link>
      <Link
        to={path.historyPurchase}
        className='block w-[180px] bg-white py-3 px-4 text-left text-sm hover:bg-slate-100 hover:text-orange'
      >
        Đơn mua
      </Link>
      <button
        onClick={() => handleLogout()}
        className='block w-[180px] bg-white py-3 px-4 text-left text-sm hover:bg-slate-100 hover:text-orange'
      >
        Đăng xuất
      </button>
    </div>
  );
}
