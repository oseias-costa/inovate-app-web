'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import useGetCompanys from '../hooks/useGetCompanys';

type Options = {
  value: { uuid: string; name: string };
  label: string;
};

type SelectCompanyProps = {
  setCompanys: Dispatch<SetStateAction<string | string[]>>;
  value?: string;
  mode?: 'multiple' | 'tags';
  companys: string | string[];
};

export default function SelectCompany({ setCompanys, value, mode, companys }: SelectCompanyProps) {
  const { data } = useGetCompanys();
  const queryClient = useQueryClient();

  let options: Options[] = [];

  if (value) {
    options.push({ value: { uuid: '1', name: '' }, label: value });
  } else {
    data && data?.map((item: any) => options.push({ value: item.uuid, label: item.name }));
  }
  console.log(companys, 'Ver se é array');
  return (
    <Select
      mode={mode}
      showSearch
      placeholder="Selecione a Empresa"
      optionFilterProp="children"
      style={{ marginRight: 10, marginBottom: 10, width: '100%' }}
      onSelect={(value) => {
        if (mode === 'multiple') {
          if (typeof companys !== 'string') {
            return setCompanys([...companys, value]);
          }
          return setCompanys([value]);
        }
        setCompanys(value);
        return queryClient.invalidateQueries({
          queryKey: ['companys', 1],
        });
      }}
      onDeselect={(value) => {
        if (typeof companys !== 'string' && companys.includes(value)) {
          const list = companys.filter((item: string) => item !== value);
          return setCompanys([...list]);
        }
      }}
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
    />
  );
}
