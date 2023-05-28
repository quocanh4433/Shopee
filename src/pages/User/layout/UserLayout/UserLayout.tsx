import UserSideNav from '../../components/UserSidenav';
import { Outlet } from 'react-router-dom';

export default function UserLayout() {
  return (
    <div className='py-4 text-sm text-gray-600 md:py-10'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
