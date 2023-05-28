import { useForm } from 'react-hook-form';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import Input from 'src/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaRegister, TypeSchemaRegister } from 'src/utils/rules';
import { useMutation } from 'react-query';
import omit from 'lodash/omit';
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils';
import { SuccessResponseType } from 'src/types/utils.type';
import { Fragment, useContext } from 'react';
import { AppContext } from 'src/context/app.context';
import Button from 'src/components/Button';
import { path } from 'src/constant/path';
import authApi from 'src/apis/auth.api';
import { Helmet } from 'react-helmet-async';

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
    resolver: yupResolver(schemaRegister)
  });

  const regsiterMutation = useMutation({
    mutationFn: (body: Omit<FormState, 'confirm_password'>) => authApi.registerApi(body)
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
    <Fragment>
      <Helmet>
        <title>Đăng ký | Shopee</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee' />
      </Helmet>
      <section className='bg-orange'>
        <div className='container mx-3 grid max-w-6xl grid-cols-1 bg-cover bg-no-repeat py-6 md:mx-auto md:grid-cols-5 md:bg-[url("https://cf.shopee.vn/file/sg-11134004-23020-75qwyq2a7snv15")] md:px-6 md:py-5 lg:py-40'>
          <div className='rounded bg-white py-6 px-8 shadow-sm md:col-span-3 md:col-start-4 md:py-10'>
            <h3 className='mb-6 text-xl'>Đăng ký</h3>
            <form onSubmit={onSubmit} noValidate>
              <Input
                name='email'
                type='email'
                placeholder='Email'
                register={register}
                autoComplete='on'
                errorMessage={errors?.email?.message}
              />

              <Input
                name='password'
                type='password'
                placeholder='Mật khẩu'
                className='relative '
                register={register}
                autoComplete='on'
                errorMessage={errors?.password?.message}
              />
              <Input
                name='confirm_password'
                type='password'
                placeholder='Xác nhận mật khẩu'
                className='relative '
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
      </section>
    </Fragment>
  );
}
