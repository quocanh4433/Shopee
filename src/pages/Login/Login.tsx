import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from 'src/components/Input';
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
      <div className='container'>
        <div className='mx-auto grid max-w-6xl grid-cols-1 bg-cover bg-no-repeat px-6 py-8 md:grid-cols-5 md:bg-[url("https://cf.shopee.vn/file/sg-11134004-23020-hgx4adi96mnvbb")] md:py-5 lg:py-40'>
          <div className='rounded bg-white py-10 px-8 shadow-sm md:col-span-3 md:col-start-4'>
            <h3 className='mb-6 text-xl'>Đăng nhập</h3>
            <form onSubmit={onSubmit} noValidate>
              <Input
                name='email'
                type='email'
                placeholder='Email'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                register={register}
                rules={rules.email}
                autoComplete='on'
                errorMessage={errors?.email?.message}
              />
              <Input
                name='password'
                type='password'
                placeholder='Mật khẩu'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                register={register}
                rules={rules.password}
                autoComplete='on'
                errorMessage={errors?.password?.message}
              />
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
      </div>
    </section>
  );
}
