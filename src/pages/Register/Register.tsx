import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <section className='bg-orange'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 bg-[url("https://cf.shopee.vn/file/sg-11134004-23020-hgx4adi96mnvbb")] bg-cover bg-no-repeat p-8 md:grid-cols-5 md:p-5 lg:py-40'>
        <div className='rounded bg-white p-10 shadow-sm md:col-span-2 md:col-start-4'>
          <h3 className='mb-6 text-xl'>Đăng ký</h3>
          <form>
            <div>
              <input
                type='text'
                placeholder='Email'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
              />
              <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>Email không đúng định dạng</p>
            </div>
            <div>
              <input
                type='password'
                placeholder='Mật khẩu'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
              />
              <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>Mật khẩu không đúng định dạng</p>
            </div>
            <div>
              <input
                type='password'
                placeholder='Xác nhận mật khẩu'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
              />
              <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>Mật khẩu không đúng định dạng</p>
            </div>

            <button
              type='button'
              className='mt-5 mb-8 w-full rounded bg-orange py-2 px-4 text-center text-sm uppercase text-white'
            >
              Đăng ký
            </button>

            <h4 className='text-center text-sm text-gray-400'>
              Bạn đã có tài khoản?
              <Link to='/login' className='ml-2 text-orange'>
                Đăng nhập
              </Link>
            </h4>
          </form>
        </div>
      </div>
    </section>
  );
}
