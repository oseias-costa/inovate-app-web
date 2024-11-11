'use client';
import isAuth from '../../lib/components/isAuth';
import { Breadcrumb, Button, Tabs, TabsProps } from 'antd';
import Drawer from '@/app/lib/components/AddRequestDrawer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import RequestsTable from '@/app/lib/components/RequestsTable';

const Requests = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [company, setCompany] = useState('');
  const [filter, setFilter] = useState({ user: '', company: '' });
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    setFilter({ user: '', company: company });
  }, [company]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Todas',
      children: <RequestsTable filter={filter} setFilter={setFilter} status="" />,
    },
    {
      key: '2',
      label: 'Pendentes',
      children: <RequestsTable filter={filter} setFilter={setFilter} status="PENDING" />,
    },
    {
      key: '3',
      label: 'Vencidas',
      children: <RequestsTable filter={filter} setFilter={setFilter} status="DUE" />,
    },
    {
      key: '4',
      label: 'Concluídas',
      children: <RequestsTable filter={filter} setFilter={setFilter} status="FINISH" />,
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/request">Solicitações</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />

      <div style={{ paddingBottom: 10, display: 'flex', flexWrap: 'wrap' }}>
        <h2 style={{ fontWeight: 400, paddingBottom: 15, color: '#404040' }}>
          Solicitações de documentos
        </h2>
        <Button
          type="primary"
          style={{ marginLeft: 'auto', marginRight: '20px' }}
          onClick={() => setOpenDrawer(true)}>
          <PlusOutlined /> Nova Solicitação
        </Button>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Drawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Requests);
