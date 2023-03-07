import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getRules } from 'src/utils/rules';
interface FormState {
  email: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormState>();

  const rules = getRules();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 bg-cover bg-no-repeat py-8 md:grid-cols-5 md:bg-[url("https://cf.shopee.vn/file/sg-11134004-23020-hgx4adi96mnvbb")] md:py-5 lg:py-40'>
          <div className='rounded bg-white py-10 px-8 shadow-sm md:col-span-3 md:col-start-4'>
            <h3 className='mb-6 text-xl'>Đăng ký</h3>
            <form onSubmit={onSubmit}>
              <div>
                <input
                  type='text'
                  placeholder='Email'
                  className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                  {...register('email', rules.email)}
                />
                <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>{errors?.email?.message}</p>
              </div>
              <div>
                <input
                  type='password'
                  placeholder='Mật khẩu'
                  className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                  {...register('password', rules.password)}
                />
                <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>{errors?.password?.message}</p>
              </div>
              <div>
                <input
                  type='password'
                  placeholder='Xác nhận mật khẩu'
                  className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                  {...register('confirm_password', rules.confirm_password)}
                />
                <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>{errors?.confirm_password?.message}</p>
              </div>

              <button
                type='submit'
                className='mt-5 mb-8 w-full rounded bg-orange py-2 px-4 text-center uppercase text-white'
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
      </div>
    </section>
  );
}
