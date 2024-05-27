import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import DocumentDetails from '@/app/portal/documentos/utils/DocumentDetails';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import DrawerCompany from './DrawerCompany';
import useGetCompanys from '@/app/_lib/_hooks/useGetCompanys';

interface CompanyTableType {
  id: string;
  name: string;
  email: string;
  status: string;
}

const data: CompanyTableType[] = [
  {
    id: '1',
    name: 'Ampla',
    email: 'ampla@ampla.com.br',
    status: 'EXPIRED',
  },
  {
    id: '2',
    name: 'Ecoadubos',
    email: 'Licença FEPAN',
    status: 'FINISH',
  },
  {
    id: '3',
    name: 'Prefeitura de Tapejara',
    email: 'Documento exemplo',
    status: 'EXPIRED',
  },  
  {
    id: '4',
    name: 'Ampla',
    email: 'Contrato Social',
    status: 'PEDING',
  },
  {
    id: '5',
    name: 'Ecoadubos',
    email: 'Licença FEPAN',
    status: 'FINISH',
  },
  {
    id: '6',
    name: 'Prefeitura de Tapejara',
    email: 'Documento exemplo',
    status: 'EXPIRED',
  },
];
// 'EXPIRED' | 'PEDING' | 'FINISH'
const TableCompanys: React.FC = () => { 
  const { data } = useGetCompanys()
  const [openDocumentDetais, setOpenDocumentDetais] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const columns: TableProps<CompanyTableType>['columns'] = [
    {
      title: 'Empresa',
      dataIndex: 'name',
      key: 'name',
      render:  (id) => {
        // const company = companys?.filter((item: Company) => item.id === id)[0] 
        // return <p>{company?.name}</p>
        return <p>{id}</p>
      }
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      render: (v) => <p>{v}</p>
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        console.log('COLORRRRRRRR', status)
        let color 
         switch(status) {
          case 'EXPIRED':
            color = 'volcano'
            break
          case 'PEDING':
            color = 'geekblue'
            break
          case 'FINISH':
            color = 'green'
            break
         } 
         console.log('COLORRRRRRRR', color)
          return( 
            <Tag color={color} key={status}>
              {status}
            </Tag>
          )
      }
    },
    {
      title: 'Ação',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='text' style={{color: '#1677ff'}} onClick={() => {
            router.push(`/portal/documentos/${record.id}`)
            return queryClient.invalidateQueries({queryKey: ['document-detail']})
          }}>Editar</Button>
        </Space>
      ),
    },
  ];

let options: CompanyTableType[] = []

const convertData = data?.map((item: any) => {
options.push({id: item.id, name: item.name, email: item.email, status: item.status})})

  return(
    <>
      <DrawerCompany 
        open={openDocumentDetais} 
        setOpen={setOpenDocumentDetais}  
            />
      <Table 
        loading={!data}
        columns={columns} 
        dataSource={options} 
        style={{width: 'calc(100vw - 326px)'}} 
        />
      </>
)};

export default TableCompanys;