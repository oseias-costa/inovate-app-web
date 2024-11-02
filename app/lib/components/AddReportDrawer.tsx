"use client";
import React, { SetStateAction, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  message,
} from "antd";
import "dayjs/locale/pt-br";
import SelectCompany from "./SelectCompany";
import { AxiosError } from "axios";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import Tiptap from "./Tiptap";
import { httpClient } from "../utils/httpClient";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function AddReportDrawer({
  open,
  setOpen,
}: DrawerComponentProps) {
  const [companys, setCompanys] = useState<string | string[]>([]);
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const queryClient = useQueryClient();

  const createNotice = useMutation({
    mutationKey: ['create-notice'],
    mutationFn: async () => await httpClient({
      path: '/reports',
      method: 'POST',
      data: {
        title,
        text,
        companyUuid: companys,
        authorUuid: 'be0f7f95-7545-11ef-84ca-047c62762b75'
      }
    }),
    onSuccess: () => {
      setOpen(false)
      setTitle('')
      setText('')
      setCompanys([])
      return queryClient.invalidateQueries({ queryKey: ["notice-page"] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message)
      }
    }
  })

  const isMutation = useIsMutating({ mutationKey: ["create-notice"], exact: true });

  return (
    <Drawer
      title="Novo relatório"
      width={720}
      onClose={() => setOpen(false)}
      open={open}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => createNotice.mutate()} type="primary">
            {isMutation ? (
              <PulseLoader color="#fff" size={6} loading={true} />
            ) : (
              "Criar"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Form.Item
          name="name"
          label="Empresa"
          rules={[{ required: true, message: "Selecione uma empresa" }]}
        >
          <SelectCompany
            setCompanys={setCompanys}
            companys={companys}
          />
        </Form.Item>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Coloque um título" }]}
        >
          <Input
            placeholder="Coloque um título"
            style={{ width: '100%' }}
            onChange={(e) => setTitle(e.target.value)} value={title}
          />
        </Form.Item>
        <Form.Item
          name="text"
          label="Descrição"
          rules={[{ required: true, message: "Preencha uma descrição" }]}
        >
          <Tiptap setText={setText} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
