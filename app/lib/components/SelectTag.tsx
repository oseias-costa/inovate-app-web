import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Select } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { httpClient } from '../utils/httpClient';

type Options = {
  value: { id: string; name: string };
  label: string;
};

type SelectTagProps = {
  setTag: Dispatch<SetStateAction<string>>;
  value?: string;
  tag: string;
  type: 'REPORT' | 'REQUEST' | 'NOTICE';
};

export default function SelectTag({ setTag, value, tag, type }: SelectTagProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['tag' + type],
    queryFn: async () =>
      httpClient({
        path: '/tags',
        queryString: {
          type,
        },
        method: 'GET',
      }),
  });

  let options: Options[] = [];

  if (value) {
    options.push({ value: { id: '1', name: '' }, label: value });
  } else {
    data?.map((item: any) => options.push({ value: item.id, label: item.name }));
  }

  return (
    <Select
      showSearch
      placeholder="Selecione a tag"
      optionFilterProp="children"
      style={{ marginRight: 10, marginBottom: 10, width: '100%' }}
      onSelect={(value) => {
        setTag(value);
      }}
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
    />
  );
}
