"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/pt_BR";
import "dayjs/locale/pt-br";
import SelectCompany from "./SelectCompany";
import useGetUser from "../_hooks/useGetUser";
import axios, { AxiosError } from "axios";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import Tiptap from "./Tiptap";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function AddNoticeDrawer({
  open,
  setOpen,
}: DrawerComponentProps) {
  const [companys, setCompanys] = useState();
  const [type, setType] = useState('')
  const queryClient = useQueryClient();
  console.log("companys", companys);
  const [request, setRequest] = useState({
    requesterId: "",
    companyId: companys,
    document: "",
    description: "",
    realmId: "",
    expiration: "",
  });
  const { user } = useGetUser();
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const d = new Date(date.toDate());
    setRequest({ ...request, expiration: d.toISOString() });
  };

  useEffect(() => {
    setRequest({
      ...request,
      companyId: companys,
      realmId: user ? user.reamlID : "",
      requesterId: user ? user.id : "",
    });
  }, [user, companys]);

  const onClose = () => {
    setOpen(false);
  };

  const postCreateDoc = async () => {
    const response = await axios({
      baseURL: "http://localhost:3009/document/create-request",
      method: "POST",
      data: { ...request },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  };

  const isMutation = useIsMutating({ mutationKey: ["documents"], exact: true });

  const mutation = useMutation({
    mutationFn: postCreateDoc,
    onSuccess: () => {
      onClose();
      return queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message)
      }
    }
  });

  if (!user) {
    return (<p>Loading</p>)
  }

  console.log(type)

  return (
    <Drawer
      title="Criar aviso"
      width={720}
      onClose={onClose}
      open={open}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={() => mutation.mutate()} type="primary">
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
            <SelectCompany setCompanys={setCompanys} mode="multiple" />
          </Form.Item>
        ) : null}
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Coloque um título" }]}
        >
          <Input placeholder="Coloque seu Sobrenome" style={{ width: '100%' }} value={user?.name} />
        </Form.Item>
        <Form.Item
          name="text"
          label="Aviso"
          rules={[{ required: true, message: "Preencha o aviso" }]}
        >
          <Tiptap />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
