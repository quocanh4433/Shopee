import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { useForm, Controller } from 'react-hook-form';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import InputNumber from 'src/components/InputNumber';
import { path } from 'src/constant/path';
import { QueryConfig } from 'src/hooks/useQueryConfig';
import { Category } from 'src/types/category.type';
import { schemaPrice, TypeSchemaPrice } from 'src/utils/rules';
import { NoUndefinedField } from 'src/utils/utils';
import RatingStars from '../RatingStart/RatingStart';
import { Fragment } from 'react';
interface Props {
  categories: Category[];
  queryConfig: QueryConfig;
}

type FormData = NoUndefinedField<TypeSchemaPrice>;

export default function AsideFilter({ categories, queryConfig }: Props) {
  const { category } = queryConfig;
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(schemaPrice)
  });

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    });
  });

  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    });
  };

  return (
    <Fragment>
      <div className='hidden py-4 md:block'>
        <Link to={path.home} className='flex items-center text-lg font-bold'>
          <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
            <g fillRule='evenodd' stroke='none' strokeWidth={1}>
              <g transform='translate(-373 -208)'>
                <g transform='translate(155 191)'>
                  <g transform='translate(218 17)'>
                    <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                    <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          Tất Cả Danh Mục
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <ul>
          {categories.map((categoryItem) => {
            const isActive = categoryItem._id === category;
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg
                      viewBox='0 0 4 7'
                      className='absolute top-[50%] left-[-10px] h-2 w-2 translate-y-[-50%] fill-orange'
                    >
                      <polygon points='4 3.5 0 0 0 7' />
                    </svg>
                  )}

                  {categoryItem.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className='mr-3 h-4 w-3 fill-current stroke-current'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='my-5'>
          <div className='mb-5'>Khoảng giá</div>
          <form className='mt-2' onSubmit={onSubmit}>
            <div className='flex items-start'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='₫ TỪ'
                      classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event);
                        trigger('price_max');
                      }}
                    />
                  );
                }}
              />
              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      placeholder='₫ ĐẾN'
                      classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      classNameError='hidden'
                      {...field}
                      onChange={(event) => {
                        field.onChange(event);
                        trigger('price_min');
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
            <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div>Đánh giá</div>
        <div className='my-3'>
          <RatingStars queryConfig={queryConfig} />
        </div>
        <div className='my-4 h-[1px] bg-gray-300' />
        <div className='my-4 h-[1px] bg-gray-300' />
        <Button
          className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
          onClick={handleRemoveAll}
        >
          Xóa tất cả
        </Button>
      </div>
    </Fragment>
  );
}
