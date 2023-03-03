import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getRules } from 'src/utils/rules';

interface FormState {
  email: string;
  password: string;
  confirm_password: string;
}

export default function Login() {
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
      <div className='mx-auto grid max-w-7xl grid-cols-1 bg-[url("https://cf.shopee.vn/file/sg-11134004-23020-hgx4adi96mnvbb")] bg-cover bg-no-repeat p-8 md:grid-cols-5 md:p-5 lg:py-40'>
        <div className='rounded bg-white py-10 px-8 shadow-sm md:col-span-3 md:col-start-4'>
          <h3 className='mb-6 text-xl'>Đăng nhập</h3>
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
                {...register('email', rules.email)}
              />
              <p className='mt-2: min-h-[1.7rem] text-xs text-red-700'>{errors?.password?.message}</p>
            </div>

            <button
              type='submit'
              className='mt-5 mb-8 w-full rounded bg-orange py-2 px-4 text-center uppercase text-white'
            >
              Đăng nhập
            </button>

            <h4 className='text-center text-sm text-gray-400'>
              Bạn mới đến Shopee?
              <Link to='/register' className='ml-2 text-orange'>
                Đăng ký
              </Link>
            </h4>
          </form>
        </div>
      </div>
    </section>
  );
}
