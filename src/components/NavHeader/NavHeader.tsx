import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { path } from 'src/constant/path';
import { AppContext } from 'src/context/app.context';
import Popover from '../Popover';
import { getAvatarUrl } from 'src/utils/utils';
import useLogout from 'src/hooks/useLogout';
import SubMenuUser from '../SubMenu/SubMenuUser';

export default function NavHeader() {
  const { isAuthenticated, profile } = useContext(AppContext);

  return (
    <div className='hidden justify-between pb-4 sm:flex'>
      <div className='flex items-center'>
        <a href={'https://banhang.shopee.vn/'} className='mr-3 text-sm capitalize hover:text-white/70'>
          Kênh Người Bán
        </a>
        <div className='h-4 border-r-[1px] border-r-white/40' />
        <p className='mx-3 flex items-center text-sm capitalize hover:text-white/70'>
          Kết nối
          <a href='https://www.facebook.com/ShopeeVN' className='ml-1' target='_blank'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0,0,256,256'
              width='17px'
              height='17px'
              fillRule='nonzero'
            >
              <g
                fill='#ffffff'
                fillRule='nonzero'
                stroke='none'
                strokeWidth={1}
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit={10}
                strokeDasharray=''
                strokeDashoffset={0}
                fontFamily='none'
                fontWeight='none'
                textAnchor='none'
                style={{ mixBlendMode: 'normal' }}
              >
                <g transform='scale(8.53333,8.53333)'>
                  <path d='M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z' />
                </g>
              </g>
            </svg>
          </a>
          <a href='https://www.instagram.com/Shopee_VN/' className='ml-1' target='_blank'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0,0,256,256' width='17px' height='17px' fillRule='nonzero'>
              <g
                fill='#ffffff'
                fillRule='nonzero'
                stroke='none'
                strokeWidth={1}
                strokeLinecap='butt'
                strokeLinejoin='miter'
                strokeMiterlimit={10}
                strokeDasharray=''
                strokeDashoffset={0}
                fontFamily='none'
                fontWeight='none'
                textAnchor='none'
              >
                <g transform='scale(8.53333,8.53333)'>
                  <path d='M9.99805,3c-3.859,0 -6.99805,3.14195 -6.99805,7.00195v10c0,3.859 3.14195,6.99805 7.00195,6.99805h10c3.859,0 6.99805,-3.14195 6.99805,-7.00195v-10c0,-3.859 -3.14195,-6.99805 -7.00195,-6.99805zM22,7c0.552,0 1,0.448 1,1c0,0.552 -0.448,1 -1,1c-0.552,0 -1,-0.448 -1,-1c0,-0.552 0.448,-1 1,-1zM15,9c3.309,0 6,2.691 6,6c0,3.309 -2.691,6 -6,6c-3.309,0 -6,-2.691 -6,-6c0,-3.309 2.691,-6 6,-6zM15,11c-2.20914,0 -4,1.79086 -4,4c0,2.20914 1.79086,4 4,4c2.20914,0 4,-1.79086 4,-4c0,-2.20914 -1.79086,-4 -4,-4z' />
                </g>
              </g>
            </svg>
          </a>
        </p>
      </div>
      <div className='flex'>
        <Popover
          className='flex cursor-pointer items-center hover:text-white/70'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <button className='block w-[180px] bg-white py-3 px-4 text-left text-sm hover:bg-slate-100 hover:text-orange'>
                Tiếng Việt
              </button>
              <button className='block w-[180px] bg-white py-3 px-4 text-left text-sm hover:bg-slate-100 hover:text-orange'>
                English
              </button>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span className='mx-1 text-sm'>Tiếng Việt</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticated && (
          <Popover
            className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
            renderPopover={<SubMenuUser />}
          >
            <div className='mr-1 h-6 w-6 flex-shrink-0'>
              <img
                src={getAvatarUrl(profile?.avatar)}
                alt='avatar'
                className='h-full w-full rounded-full fill-slate-50 object-cover'
              />
            </div>
            <div className='text-sm'>{profile?.email}</div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={path.register} className='mx-3 text-sm capitalize hover:text-white/70'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-[1px] border-r-white/40' />
            <Link to={path.login} className='ml-3 text-sm capitalize hover:text-white/70'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
