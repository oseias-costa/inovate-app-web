'use client';
import { Breadcrumb, Button, Form, Row } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { PulseLoader } from 'react-spinners';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/assets/logo-i.png';
import Link from 'next/link';
import isAuth from '@/app/lib/components/isAuth';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/app/lib/utils/httpClient';
import { useState } from 'react';
import EditReport from '@/app/lib/components/EditReport';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Document } from '../../../lib/types/document.type';

const ReportDetails = () => {
  const params = useParams();
  const id = params.id as string;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState({ key: '', loading: false });

  const { data, isLoading } = useQuery({
    queryKey: [`report-${id}`],
    queryFn: async () =>
      httpClient({
        path: `/reports/${id}`,
        method: 'GET',
      }),
  });

  const downloadFile = async (key: string, name: string) => {
    try {
      const response = await axios.get(`http://localhost:3009/document/download?key=${key}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setLoadingDownload({ key, loading: false });
      console.error('Error downloading file:', error);
    }
    setLoadingDownload({ key, loading: false });
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: 'calc(100vw - 350px)',
          marginTop: 100,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <div style={{ textAlign: 'center' }}>
          <Image src={Logo} alt="Logo" width={50} />
          <PulseLoader color="#00264B" size={8} loading={true} />
        </div>
      </div>
    );
  }

  return (
    <Form layout="vertical" hideRequiredMark style={{ width: '900px' }}>
      <EditReport setOpen={setOpenDrawer} open={openDrawer} key={id} reportUuid={id} />
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/report">Relatórios</Link> },
          {
            title: <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{data?.title}</p>,
          },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ fontWeight: 400, paddingBottom: 25, color: '#404040' }}>{data.title}</h2>
        <Button onClick={() => setOpenDrawer(true)}>Editar</Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
      {data.documents ? (
        <Row>
          <Form.Item name="download-buttons" label="Documentos :" style={{ marginTop: 30 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data.documents &&
                data?.documents?.map((document: Document) => (
                  <Button
                    style={{ marginTop: 3 }}
                    icon={<DownloadOutlined />}
                    size="large"
                    loading={document.path === loadingDownload.key && loadingDownload.loading}
                    onClick={() => {
                      setLoadingDownload({ key: document.path, loading: true });
                      downloadFile(document.path, document.name);
                    }}>
                    {document.name}
                  </Button>
                ))}
            </div>
          </Form.Item>
        </Row>
      ) : null}
    </Form>
  );
};

export default isAuth(ReportDetails);
