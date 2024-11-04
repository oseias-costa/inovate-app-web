"use client";
import React, { SetStateAction, useState } from "react";
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
  Space,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/pt_BR";
import "dayjs/locale/pt-br";
import SelectCompany from "./SelectCompany";
import axios, { AxiosError } from "axios";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import { useUser } from "./UserProvider";
import { httpClient } from "../utils/httpClient";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function DrawerComponent({
  open,
  setOpen,
}: DrawerComponentProps) {
  const { user } = useUser()
  const [company, setCompany] = useState<string | string[]>("");
  const queryClient = useQueryClient();
  const [request, setRequest] = useState({
    document: "",
    description: "",
    expiration: "",
  });

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const d = new Date(date.toDate());
    setRequest({ ...request, expiration: d.toISOString() });
  };

  const onClose = () => {
    setOpen(false);
  };

  const isMutation = useIsMutating({ mutationKey: ["create-request"], exact: true });

  const mutation = useMutation({
    mutationKey: ['create-request'],
    mutationFn: async () => httpClient({
      method: 'POST',
      path: '/requests',
      data: {
        requesterUuid: user?.uuid,
        companyUuid: company,
        ...request
      }
    }),
    onSuccess: () => {
      onClose();
      message.success(`Solicitação criada com sucesso!`)
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

  return (
    <Drawer
      title="Criar solicitação"
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Empresa"
              rules={[{ required: true, message: "Coloque seu Nome" }]}
            >
              <SelectCompany setCompanys={setCompany} companys={company} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="requester"
              label="Solicitante"
              initialValue={user?.name}
              rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
            >
              <Input placeholder="Coloque seu Sobrenome" disabled value={user?.name} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Documento"
              rules={[{ required: true, message: "Coloque o nome do documento" }]}
            >
              <Input
                onChange={(e) =>
                  setRequest({ ...request, document: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <p style={{ height: "22px", marginBottom: "8px" }}>Prazo</p>
            <ConfigProvider locale={locale}>
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </ConfigProvider>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Descrição"
              rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
            >
              <TextArea
                onChange={(e) =>
                  setRequest({ ...request, description: e.target.value })
                }
                placeholder="Escreva uma descrição"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
