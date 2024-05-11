import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  company: string;
  document: string;
  age: string;
  status: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Empresa',
    dataIndex: 'company',
    key: 'company',
    render: (v) => <p>{v}</p>
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
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <>
        {status.map((status) => {
          let color = status === 'pendente' ? 'geekblue' : 'green';
          if (status === 'vencido') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Solicitante',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <a>Detalhes</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    company: 'Ampla',
    document: 'Contrato Social',
    age: '12/05/24',
    status: ['pendente'],
  },
  {
    key: '2',
    company: 'Ecoadubos',
    document: 'Licença FEPAN',
    age: '14/05/24',
    status: ['Concluído'],
  },
  {
    key: '3',
    company: 'Prefeitura de Tapejara',
    document: 'Documento exemplo',
    age: '20/05/24',
    status: ['vencido'],
  },  
  {
    key: '4',
    company: 'Ampla',
    document: 'Contrato Social',
    age: '12/05/24',
    status: ['pendente'],
  },
  {
    key: '5',
    company: 'Ecoadubos',
    document: 'Licença FEPAN',
    age: '14/05/24',
    status: ['Concluído'],
  },
  {
    key: '6',
    company: 'Prefeitura de Tapejara',
    document: 'Documento exemplo',
    age: '20/05/24',
    status: ['vencido'],
  },
];

const TableAnt: React.FC = () => <Table columns={columns} dataSource={data} style={{width: 'calc(100vw - 326px)'}} />;

export default TableAnt;