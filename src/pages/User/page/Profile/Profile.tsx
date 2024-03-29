import { useMutation, useQuery } from 'react-query';
import userApi from 'src/apis/user.api';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaProfile, TypeProfileSchema } from 'src/utils/rules';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import InputNumber from 'src/components/InputNumber';
import DateSelect from 'src/components/DateSelect';
import { AppContext } from 'src/context/app.context';
import { setProfileToLS } from 'src/utils/auth';
import { toast } from 'react-toastify';
import { getAvatarUrl, isAxiosErrorUnprocessableEntity } from 'src/utils/utils';
import { ErrorResponseType } from 'src/types/utils.type';
import InputFile from 'src/components/InputFile';

type FormData = TypeProfileSchema;
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string;
};

export default function Profile() {
  const { setProfile } = useContext(AppContext);
  const [file, setFile] = useState<File>();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });

  const profile = profileData?.data?.data;
  const updateProfileMutation = useMutation(userApi.updateProfile);
  const uploadAvatarMutaion = useMutation(userApi.uploadAvatar);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(schemaProfile)
  });

  const avatar = watch('avatar');

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name);
      setValue('phone', profile.phone);
      setValue('address', profile.address);
      setValue('avatar', profile.avatar);
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append('image', file);
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form);
        avatarName = uploadRes.data.data;
        setValue('avatar', avatarName);
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString()!,
        avatar: avatarName
      });
      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      refetch();
      toast.success(res.data.message);
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<ErrorResponseType<FormDataError>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            });
          });
        }
      }
    }
  });

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-4 flex flex-col-reverse md:mt-8 md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                autoComplete='on'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                autoComplete='on'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-row items-center md:flex-col'>
            <div className='mr-2 h-24 w-24 md:my-5'>
              <img
                src={previewImage || getAvatarUrl(avatar)}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-xs text-gray-400 md:text-base'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
