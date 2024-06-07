import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Document } from '../types/document.type';
import useGetCompanys from '../_hooks/useGetCompanys';
import DocumentDetails from '@/app/portal/documentos/utils/DocumentDetails';
import { Company } from '../types/company.type';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

interface DataType {
  key: string;
  company: string;
  document: string;
  age: string;
  status: string;
}

const data: DataType[] = [
  {
    key: '1',
    company: 'Ampla',
    document: 'Contrato Social',
    age: '12/05/24',
    status: 'EXPIRED',
  },
  {
    key: '2',
    company: 'Ecoadubos',
    document: 'Licença FEPAN',
    age: '14/05/24',
    status: 'FINISH',
  },
  {
    key: '3',
    company: 'Prefeitura de Tapejara',
    document: 'Documento exemplo',
    age: '20/05/24',
    status: 'EXPIRED',
  },  
  {
    key: '4',
    company: 'Ampla',
    document: 'Contrato Social',
    age: '12/05/24',
    status: 'PEDING',
  },
  {
    key: '5',
    company: 'Ecoadubos',
    document: 'Licença FEPAN',
    age: '14/05/24',
    status: 'FINISH',
  },
  {
    key: '6',
    company: 'Prefeitura de Tapejara',
    document: 'Documento exemplo',
    age: '20/05/24',
    status: 'EXPIRED',
  },
];
// 'EXPIRED' | 'PEDING' | 'FINISH'
const TableAnt: React.FC = () => { 
  const {data} = useGetCompanys()
  const [openDocumentDetais, setOpenDocumentDetais] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const queryClient = useQueryClient()
  const {data: companys} = useGetCompanys()
  const router = useRouter()
  const [pagination, setPagination] = useState({page: '1', limit: '2'})

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      render:  (id) => {
        const company = companys?.filter((item: Company) => item.id === id)[0] 
        return <p>{company?.name}</p>
      }
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      key: 'document',
      render: (v) => <p>{v}</p>
    },
    {
      title: 'Prazo',
      dataIndex: 'age',
      key: 'age',
      render: (v) => {
        const date = dayjs(v).format('DD-MM-YYYY')
        return <p>{date}</p>
      }
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
      title: 'Solicitante',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='text' style={{color: '#1677ff'}} onClick={() => {
            router.push(`/portal/documentos/${record.key}`)
            return queryClient.invalidateQueries({queryKey: ['document-detail']})
          }}>Detalhes</Button>
        </Space>
      ),
    },
  ];

  const getDocuments = async () => {
    const documents =  await axios({
        method: 'GET',
        baseURL: `http://localhost:3009/document?page=${pagination.page}&limit=${pagination.limit}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })

    return documents.data
}

type Documents = {
  "items": Document[]
  "meta": {
    "totalItems": number
    "itemCount": number
    "itemsPerPage": number
    "totalPages": number
    "currentPage": number  }
}

const { data: docs, isLoading } = useQuery<Documents>({
    queryKey: [`document-page-${pagination.page}`],
    queryFn: getDocuments
})
let options: DataType[] = []
const convertData = docs?.items?.map((item: any) => {
  console.log(item)
  options.push({key: item.id, company: item.companyId, document: item.document, age: item.expiration, status: item.status})})
console.log(options)

  return(
    <>
      <DocumentDetails 
        open={openDocumentDetais} 
        setOpen={setOpenDocumentDetais}  
        id={documentId}
            />
      <Table 
        columns={columns} 
        dataSource={options} 
        pagination={{
          current: docs?.meta.currentPage,
          pageSize: docs?.meta.itemsPerPage,
          total: docs?.meta.totalItems
        }}
        onChange={(item) => {
          setPagination({page: String(item['current']), limit: '2'})
        }}
        style={{width: 'calc(100vw - 326px)'}} 
        />
      </>
)};

export default TableAnt;