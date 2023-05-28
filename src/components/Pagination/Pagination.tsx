import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';
import { path } from 'src/constant/path';
import { QueryConfig } from 'src/hooks/useQueryConfig';

interface Props {
  queryConfig: QueryConfig;
  pageSize: number;
}

const RANGE = 2;

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <button key={index} className='mx-2 rounded border bg-white px-2 py-1 shadow-sm md:px-3 md:py-2'>
            ...
          </button>
        );
      }
      return null;
    };
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <button key={index} className='mx-2 rounded border bg-white px-2 py-1 shadow-sm md:px-3 md:py-2'>
            ...
          </button>
        );
      }
      return null;
    };
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Điều kiện để return về ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index);
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index);
        }

        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 cursor-pointer px-2 py-0.5 text-sm md:mx-4 md:py-1 md:px-4 md:text-lg', {
              'rounded bg-orange font-semibold text-white': pageNumber === page
            })}
          >
            {pageNumber}
          </Link>
        );
      });
  };

  return (
    <section className='mt-6 flex flex-wrap items-center justify-center'>
      {page === 1 ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mx-4 h-4 w-4 md:mx-6 md:h-6 md:w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='cursor-pointer '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mx-4 h-4 w-4 md:mx-6 md:h-6 md:w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mx-4 h-4 w-4 cursor-pointer md:mx-6 md:h-6 md:w-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='cursor-pointer '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='mx-4 h-4 w-4 md:mx-6 md:h-6 md:w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </section>
  );
}
