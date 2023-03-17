import { useForm } from 'react-hook-form';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import Input from 'src/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, TypeSchemaRegister } from 'src/utils/rules';
import { useMutation } from 'react-query';
import { registerApi } from 'src/apis/auth.api';
import { omit } from 'lodash';
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils';
import { SuccessResponseType } from 'src/types/utils.type';
import { useContext } from 'react';
import { AppContext } from 'src/context/app.context';
import Button from 'src/components/Button';
import { path } from 'src/constant/path';

type FormState = TypeSchemaRegister;

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormState>({
    resolver: yupResolver(schema)
  });

  const regsiterMutation = useMutation({
    mutationFn: (body: Omit<FormState, 'confirm_password'>) => registerApi(body)
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password']);
    regsiterMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        navigate(path.login);
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<SuccessResponseType<Omit<FormState, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormState, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormState, 'confirm_password'>],
                type: 'Server'
              });
            });
          }
        }
      }
    });
  });

  return (
    <section className='bg-orange'>
      <div className='container'>
        <div className='mx-auto grid max-w-6xl grid-cols-1 bg-cover bg-no-repeat px-6 py-8 md:grid-cols-5 md:bg-[url("https://cf.shopee.vn/file/sg-11134004-23020-75qwyq2a7snv15")] md:py-5 lg:py-40'>
          <div className='rounded bg-white py-10 px-8 shadow-sm md:col-span-3 md:col-start-4'>
            <h3 className='mb-6 text-xl'>Đăng ký</h3>
            <form onSubmit={onSubmit} noValidate>
              <Input
                name='email'
                type='email'
                placeholder='Email'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                register={register}
                autoComplete='on'
                errorMessage={errors?.email?.message}
              />
              <Input
                name='password'
                type='password'
                placeholder='Mật khẩu'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                register={register}
                autoComplete='on'
                errorMessage={errors?.password?.message}
              />
              <Input
                name='confirm_password'
                type='password'
                placeholder='Xác nhận mật khẩu'
                className='w-full rounded border border-gray-300 px-4 py-2 outline-none focus:border-gray-400 focus:shadow'
                register={register}
                autoComplete='on'
                errorMessage={errors?.confirm_password?.message}
              />
              <Button
                type='submit'
                className='mt-5 mb-8 flex w-full items-center justify-center rounded bg-orange py-2 px-4  text-center uppercase text-white'
                isLoading={regsiterMutation.isLoading}
                disabled={regsiterMutation.isLoading}
              >
                Đăng ký
              </Button>
              <h4 className='text-center text-sm text-gray-400'>
                Bạn đã có tài khoản?
                <Link to={path.login} className='ml-2 text-orange'>
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
