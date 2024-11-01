"use client";
import React, { SetStateAction, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
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
import { httpClient } from "../_utils/httpClient";
import Tynymce from "./Tynymce";
import SelectUsers from "./SelectUsers";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function AddNoticeDrawer({
  open,
  setOpen,
}: DrawerComponentProps) {
  const [companys, setCompanys] = useState<string | string[]>([]);
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const queryClient = useQueryClient();

  const users = typeof companys !== 'string' && companys.map((user) => ({ name: '', uuid: user }))

  const createNotice = useMutation({
    mutationKey: ['create-notice'],
    mutationFn: async () => await httpClient({
      path: '/notice',
      method: 'POST',
      data: { title, text, users, type }
    }),
    onSuccess: () => {
      setOpen(false)
      setTitle('')
      setText('')
      setCompanys([])
      setType('')
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
      title="Criar aviso"
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
          name="type"
          label="Escolha para quem deseja enviar"
          rules={[{ required: true, message: "Selecione uma empresa" }]}
        >

          <Select
            style={{ width: '100%' }}
            onChange={(e) => setType(e)}
            options={[
              { value: 'SELECTED_COMPANYS', label: 'Selecione as empresas' },
              { value: 'SELECTED_USERS', label: 'Selecione os coloboradores' },
              { value: 'ALL_COMPANYS', label: 'Todas as empresas' },
              { value: 'ALL_USERS', label: 'Todos os colaboradores', },
            ]}
          />
        </Form.Item>
        {type === "SELECTED_COMPANYS" ? (
          <Form.Item
            name="name"
            label="Empresa"
            rules={[{ required: true, message: "Selecione uma empresa" }]}
          >
            <SelectCompany
              setCompanys={setCompanys}
              companys={companys}
              mode="multiple"
            />
          </Form.Item>
        ) : null}
        {type === "SELECTED_USERS" ? (
          <Form.Item
            name="users"
            label="Usuários"
            rules={[{ required: true, message: "Selecione os usuários" }]}
          >
            <SelectUsers
              setUsers={setCompanys}
              users={companys}
              mode="multiple"
            />
          </Form.Item>
        ) : null}
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
          label="Aviso"
          rules={[{ required: true, message: "Preencha o aviso" }]}
        >
          <Tiptap setText={setText} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
