'use client';
import {
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Tag,
  message,
  notification,
} from 'antd';
import locale from 'antd/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import TextArea from 'antd/es/input/TextArea';
import { PulseLoader } from 'react-spinners';
import { InboxOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/public/assets/logo-i.png';
import Link from 'next/link';
import Dragger from 'antd/es/upload/Dragger';
import isAuth from '@/app/lib/components/isAuth';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/app/lib/utils/httpClient';
import { useState } from 'react';
import EditRequest from '@/app/lib/components/EditRequest';
import { File } from '@/app/lib/types/upload.type';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Document } from '@/app/lib/types/document.type';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Request = () => {
  const params = useParams();
  const id = params.id as string;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [loadingDownload, setLoadingDownload] = useState({ key: '', loading: false });

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Documento enviado com sucesso',
      description: 'Solicitação foi concluída',
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: [`request-${id}`],
    queryFn: async () =>
      httpClient({
        path: `/requests/${id}`,
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

  const date = dayjs(data?.expiration);

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
    <Form layout="vertical" hideRequiredMark style={{ width: 900 }}>
      {contextHolder}
      <EditRequest
        open={openDrawer}
        setOpen={setOpenDrawer}
        requestUuid={data?.uuid}
        key={data?.uuid}
      />
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/request">Solicitações</Link> },
          {
            title: <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{data?.documentName}</p>,
          },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 400, paddingBottom: 25, color: '#404040' }}>
            Detalhes da Solicitação
          </h2>
          <Tag
            color={'geekblue'}
            key={data?.status}
            style={{ maxHeight: 20, marginTop: 6, marginLeft: 15 }}>
            {data?.status}
          </Tag>
        </div>

        <Button style={{ marginLeft: 'auto' }} onClick={() => setOpenDrawer(true)}>
          Editar
        </Button>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Empresa"
            rules={[{ required: true, message: 'Coloque seu Nome' }]}
            initialValue={data?.company}>
            <Input value={data?.company} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="requester"
            label="Solicitante"
            initialValue={data?.requesterId}
            rules={[{ required: true, message: 'Coloque seu Sobrenome' }]}>
            <Input placeholder="Coloque seu Sobrenome" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Documento"
            rules={[{ required: true, message: 'Coloque seu Sobrenome' }]}
            initialValue={data?.documentName}>
            <Input
              value={data?.documentName}
              disabled
              styles={{ input: { color: '#666666', backgroundColor: '#fff' } }}
              onChange={(e) => console.log(e)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <p style={{ height: '22px', marginBottom: '8px' }}>Prazo</p>
          <ConfigProvider locale={locale}>
            <DatePicker
              disabled
              defaultValue={date}
              contentEditable={false}
              format="DD-MM-YYYY"
              color="red"
              style={{ width: '100%', backgroundColor: '#fff', color: '#000' }}
            />
          </ConfigProvider>
        </Col>
        <Col span={24}>
          <Form.Item
            name="lastName"
            label="Descrição"
            rules={[{ required: true, message: 'Coloque seu Sobrenome' }]}
            initialValue={data?.description}>
            <TextArea
              // onChange={(e) => setRequest({...request, description: e.target.value})}
              placeholder="Escreva uma descrição"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item
          name="upload-document"
          label="Enviar documento"
          initialValue={data?.document}
          style={{ width: '100%' }}>
          <Dragger
            name="file"
            action={`http://localhost:3009/document/upload/${id}?name=${file?.name}&mimeType=${file?.type}&type=REQUEST&size=${file?.size}`}
            headers={{
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }}
            beforeUpload={(file) => {
              const uploadFile = file as unknown as File;
              setFile(uploadFile);
            }}
            isImageUrl={(file) => data?.url !== ''}
            showUploadList={{
              showDownloadIcon: true,
              showRemoveIcon: true,
              removeIcon: (
                <StarOutlined onClick={(e) => console.log(e, 'custom removeIcon event')} />
              ),
            }}
            onChange={(info) => {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                openNotificationWithIcon('success');
              } else if (info.file.status === 'error') {
                message.error(`Ocorreu um erro ao enviar o documento ${info.file.name}.`);
              }
            }}
            style={{ width: '100%' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Clique aqui ou arraste o documento para fazer o envio</p>
            <p className="ant-upload-hint">
              Selecione o documento solicitado, os formatos aceitos são pdf e word e excel.
            </p>
          </Dragger>
        </Form.Item>
      </Row>
      {data.documents ? (
        <Row>
          <Form.Item name="download-buttons" label="Documentos :">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data.documents &&
                data.documents?.map((document: Document) => (
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

export default isAuth(Request);
