import { yupResolver } from '@hookform/resolvers/yup';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import useQueryConfig from './useQueryConfig';
import { schemaSearch, TypeSchemaSearch } from 'src/utils/rules';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from 'src/constant/path';

type FormData = TypeSchemaSearch;

export default function useSearchProducts() {
  const queryConfig = useQueryConfig();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(schemaSearch)
  });
  const navigate = useNavigate();

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        };
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    });
  });
  return { onSubmitSearch, register };
}
