import classNames from 'classnames';
import { Fragment, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { path } from 'src/constant/path';
import { AppContext } from 'src/context/app.context';
import { getAvatarUrl } from 'src/utils/utils';

export default function UserSideNav() {
  const { profile } = useContext(AppContext);
  return (
    <Fragment>
      <div className='flex justify-center border-b border-b-gray-200 py-2 md:block'>
        <div className='mr-2 h-14 w-14 md:mx-auto'>
          <Link to={path.profile}>
            <img src={getAvatarUrl(profile?.avatar)} alt='' className='rounded-full object-contain' />
          </Link>
        </div>
        <div className='text-xs md:text-base'>
          <p className='mb-1 truncate text-center font-semibold text-gray-600'>{profile?.name || profile?.email}</p>
          <Link to={path.profile} className='flex items-center justify-center capitalize text-gray-500'>
            <svg
              className='h-2 w-3 md:h-3 md:w-3'
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7 flex items-center justify-between md:block'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames(' flex items-center text-xs capitalize transition-colors md:text-base', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-1 h-5 w-5 md:mr-2 md:h-6 md:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames(' flex items-center text-xs capitalize transition-colors md:mt-4  md:text-base', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-1 h-5 w-5 md:mr-2 md:h-6 md:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('flex items-center text-xs capitalize transition-colors md:mt-4  md:text-base', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mr-1 h-5 w-5 md:mr-2 md:h-6 md:w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
            />
          </svg>
          Đơn mua
        </NavLink>
      </div>
    </Fragment>
  );
}
