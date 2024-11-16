import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { httpClient } from '../utils/httpClient';
import SelectTag from './SelectTag';
import { PulseLoader } from 'react-spinners';

type Options = {
  value: { uuid: string; name: string };
  label: string;
};

type SelectTagProps = {
  setTag: Dispatch<SetStateAction<string>>;
  value?: string;
  tag: string;
  type: 'REPORT' | 'REQUEST' | 'NOTICE';
  current: number;
};

export default function AddTag({ setTag, value, tag, type, current }: SelectTagProps) {
  const [add, setAdd] = useState(false);
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

  useEffect(() => {
    if (value) {
      options.push({ value: { uuid: '1', name: '' }, label: value });
    } else {
      data?.map((item: any) => options.push({ value: item.uuid, label: item.name }));
    }
  }, [data]);
  if (value) {
    options.push({ value: { uuid: '1', name: '' }, label: value });
  } else {
    data?.map((item: any) => options.push({ value: item.uuid, label: item.name }));
  }

  const createTag = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: async (data) =>
      httpClient({
        path: '/tags',
        method: 'POST',
        data: {
          name: tag,
          type,
        },
      }),
    onSuccess: () => {
      setTag('');
      setAdd(false);
      return queryClient.invalidateQueries({ queryKey: ['tag' + type] });
    },
    onError: (err) => console.log(err),
  });

  const isMutation = useIsMutating({ mutationKey: ['create-tag'], exact: true });

  return (
    <Form.Item
      name="tag"
      label="Etiqueta"
      rules={[{ required: true, message: 'Escolhe uma etiqueta' }]}>
      <SelectTag setTag={setTag} tag={tag} type={type} />
      {add ? (
        <div
          style={{
            padding: 20,
            border: '1px solid #ddd',
            borderRadius: 7,
            height: add ? 'auto' : 0,
          }}>
          <p>Adicionar Etiqueta</p>
          <Input
            placeholder="Nome da etiqueta"
            style={{ width: '100%', marginBottom: 10, marginTop: 10 }}
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            disabled={current === 1}
          />
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={() => setAdd(false)} style={{ marginRight: 4 }}>
              Cancelar
            </Button>
            <Button type="primary" onClick={() => createTag.mutate()}>
              {' '}
              {isMutation ? <PulseLoader color="#fff" size={6} loading={true} /> : 'Entrar'}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setAdd(true)}
          type="link"
          style={{ position: 'absolute', right: 0, bottom: 45 }}>
          Adicionar
        </Button>
      )}
    </Form.Item>
  );
}
