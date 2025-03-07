'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Document } from '../types/document.type';
import DocumentDetails from '@/app/portal/documentos/utils/DocumentDetails';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { httpClient } from '../utils/httpClient';
import { useUser } from './UserProvider';
import useError from '../hooks/useError';

interface DataType {
  key: string;
  company: string;
  documentName: string;
  age: string;
  status: string;
}

type TableDocumentsProps = {
  filter: {
    user: string;
    company: string;
  };
  setFilter: Dispatch<SetStateAction<{ user: string; company: string }>>;
  status: '' | 'PENDING' | 'DUE' | 'FINISH';
};

const RequestsTable = ({ filter, setFilter, status }: TableDocumentsProps) => {
  const [openDocumentDetais, setOpenDocumentDetais] = useState(false);
  const [documentId, setDocumentId] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();
  const [pagination, setPagination] = useState({ page: '1', limit: '6' });
  const { user } = useUser();
  const { handleError } = useError();

  // useEffect(() => {
  //   if (user?.type === "COMPANY") {
  //     setFilter({ ...filter, company: user.id });
  //   }
  // }, [user]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Documento',
      dataIndex: 'documentName',
      key: 'documentName',
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Prazo',
      dataIndex: 'age',
      key: 'age',
      render: (v) => {
        const date = dayjs(v).format('DD-MM-YYYY');
        return <p>{date}</p>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status) {
          case 'Vencido':
            color = 'volcano';
            break;
          case 'Pendente':
            color = 'geekblue';
            break;
          case 'Concluído':
            color = 'green';
            break;
        }

        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Solicitante',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            style={{ color: '#1677ff' }}
            onClick={() => {
              router.push(`/portal/request/${record.key}`);
              return queryClient.invalidateQueries({
                queryKey: ['document-detail'],
              });
            }}>
            Detalhes
          </Button>
        </Space>
      ),
    },
  ];

  const {
    data: docs,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery<Documents>({
    queryKey: [`document-page`, pagination.page, status],
    queryFn: async () =>
      httpClient({
        path: '/requests',
        method: 'GET',
        queryString: {
          page: pagination.page,
          limit: pagination.limit,
          filter: filter.company,
          companyUuid: user?.uuid,
          status,
        },
      }),
  });

  useEffect(() => {
    console.log('uer', user);
    refetch();
  }, [user]);

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [isError]);

  type Documents = {
    items: Document[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };

  let options: DataType[] = [];
  const convertData = docs?.items?.map((item: any) => {
    options.push({
      key: item.uuid,
      company: item.company,
      documentName: item.documentName,
      age: item.expiration,
      status: item.status,
    });
  });

  return (
    <>
      <DocumentDetails open={openDocumentDetais} setOpen={setOpenDocumentDetais} id={documentId} />
      <Table
        columns={columns}
        dataSource={options}
        pagination={{
          current: docs?.meta.currentPage,
          pageSize: docs?.meta.itemsPerPage,
          total: docs?.meta.totalItems,
        }}
        onChange={(item) => {
          setPagination({ ...pagination, page: String(item['current']) });
        }}
        style={{ width: 'calc(100vw - 326px)' }}
      />
    </>
  );
};

export default RequestsTable;
