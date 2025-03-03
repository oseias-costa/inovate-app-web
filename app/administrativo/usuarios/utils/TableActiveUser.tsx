import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import DrawerCompany from './DrawerUser';
import { Company } from '@/app/lib/types/company.type';
import { httpClient } from '@/app/lib/utils/httpClient';

interface CompanyTableType {
  id: string;
  name: string;
  email: string;
  status: string;
}

const TableActiveUser: React.FC = () => {
  const { data } = useQuery<Company[]>({
    queryKey: ['users-active'],
    queryFn: async () =>
      httpClient({
        path: '/users/get-users',
        method: 'GET',
      }),
  });

  const [openDocumentDetais, setOpenDocumentDetais] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const columns: TableProps<CompanyTableType>['columns'] = [
    {
      title: 'Usuário',
      dataIndex: 'name',
      key: 'name',
      render: (id) => {
        return <p>{id}</p>;
      },
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      render: (v) => <p>{v}</p>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        console.log('COLORRRRRRRR', status);
        let color;
        switch (status) {
          case 'EXPIRED':
            color = 'volcano';
            break;
          case 'PEDING':
            color = 'geekblue';
            break;
          case 'FINISH':
            color = 'green';
            break;
        }
        console.log('COLORRRRRRRR', color);
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Ação',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            style={{ color: '#1677ff' }}
            onClick={() => {
              router.push(`/portal/documentos/${record.id}`);
              return queryClient.invalidateQueries({ queryKey: ['document-detail'] });
            }}>
            Editar
          </Button>
        </Space>
      ),
    },
  ];

  let options: CompanyTableType[] = [];
  console.log(data);
  const convertData =
    data ??
    data?.map((item: any) => {
      options.push({ id: item.id, name: item.name, email: item.email, status: item.status });
    });

  return (
    <>
      <DrawerCompany open={openDocumentDetais} setOpen={setOpenDocumentDetais} />
      <Table
        loading={!data}
        columns={columns}
        dataSource={options}
        style={{ width: 'calc(100vw - 326px)' }}
      />
    </>
  );
};

export default TableActiveUser;
