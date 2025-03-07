'use client';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button, Drawer, Form, Input, Select, Space, message, Steps } from 'antd';
import 'dayjs/locale/pt-br';
import SelectCompany from './SelectCompany';
import { AxiosError } from 'axios';
import { useIsMutating, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PulseLoader from 'react-spinners/PulseLoader';
import { httpClient } from '../utils/httpClient';
import { File } from '@/app/lib/types/upload.type';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
// import JoditEditor from 'jodit-react';
import SelectTag from './SelectTag';
import AddTag from './AddTag';

type DrawerComponentProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddNoticeDrawer({ open, setOpen }: DrawerComponentProps) {
  const [company, setCompany] = useState<string | string[]>('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const queryClient = useQueryClient();
  const [current, setCurrent] = useState(0);
  const [file, setFile] = useState<File | undefined>();
  const [id, setId] = useState();
  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 400,
  };

  const createNotice = useMutation({
    mutationKey: ['create-notice'],
    mutationFn: async () =>
      await httpClient({
        path: '/notice',
        method: 'POST',
        data: { title, text, user: company, tag },
      }),
    onSuccess: (data) => setId(data),
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message);
      }
    },
  });

  const isMutation = useIsMutating({ mutationKey: ['create-notice'], exact: true });

  const onClose = () => {
    setTitle('');
    setText('');
    setOpen(false);
    setCurrent(0);
  };

  const handleNextStep = () => {
    if (current === 0) {
      createNotice.mutate();
      return setCurrent(1);
    }

    onClose();
    return queryClient.invalidateQueries({ queryKey: ['notice-page'] });
  };

  const createTag = useMutation({
    mutationKey: ['create-tag'],
    mutationFn: async (data) =>
      httpClient({
        path: '/tag',
        method: 'PATCH',
        data,
      }),
  });

  return (
    <Drawer
      title="Criar aviso"
      width={720}
      // onClose={onClose}
      open={open}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          {/* <Button onClick={onClose}>Cancelar</Button> */}
          {/* <Button onClick={handleNextStep} type="primary"> */}
          {/*   {isMutation ? ( */}
          {/*     <PulseLoader color="#fff" size={6} loading={true} /> */}
          {/*   ) : current === 0 ? ( */}
          {/*     'Próximo' */}
          {/*   ) : ( */}
          {/*     'Enviar' */}
          {/*   )} */}
          {/* </Button> */}
        </Space>
      }>
      <Form layout="vertical" hideRequiredMark>
        <Steps
          current={current}
          items={[{ title: 'Preencha o aviso' }, { title: 'Faça o upload' }]}
          style={{ marginBottom: 40 }}
        />
        <Form.Item
          name="name"
          label="Empresa"
          rules={[{ required: true, message: 'Coloque seu Nome' }]}>
          <SelectCompany setCompanys={setCompany} companys={company} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: 'Coloque um título' }]}>
          <Input
            placeholder="Coloque um título"
            style={{ width: '100%' }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            disabled={current === 1}
          />
        </Form.Item>
        <AddTag tag={tag} setTag={setTag} type="NOTICE" current={current} />
        <Form.Item
          name="text"
          label="Aviso"
          rules={[{ required: true, message: 'Preencha o aviso' }]}>
          {/* <JoditEditor */}
          {/*   ref={editor} */}
          {/*   value={text} */}
          {/*   config={config} */}
          {/*   onBlur={(event) => setText(event)} */}
          {/*   onChange={(newContent) => {}} */}
          {/* /> */}
        </Form.Item>
        <Form.Item name="upload-document" label="Anexar um documento">
          <Dragger
            disabled={current === 0}
            name="file"
            action={`http://localhost:3009/document/upload/${id}?name=${file?.name}&mimeType=${file?.type}&type=NOTICE&size=${file?.size}`}
            headers={{
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }}
            beforeUpload={(file) => {
              const uploadFile = file as unknown as File;
              setFile(uploadFile);
            }}
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
                message.success(`Ocorreu um erro ao enviar o documento ${info.file.name}.`);
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
      </Form>
    </Drawer>
  );
}
