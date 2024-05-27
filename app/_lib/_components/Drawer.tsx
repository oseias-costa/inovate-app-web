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
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import SelectCompany from "./SelectCompany";
import useGetUser from "../_hooks/useGetUser";
import axios from "axios";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function DrawerComponent({
  open,
  setOpen,
}: DrawerComponentProps) {
  const [companys, setCompanys] = useState("");
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
    console.log(date, dateString);
    const d = new Date();
    console.log(d);
    setRequest({ ...request, expiration: String(d) });
  };

  useEffect(() => {
    console.log("typeof", user);
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
    onError: (err) => {
      console.log(err);
    },
  });

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
              <SelectCompany setCompanys={setCompanys} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="requester"
              label="Solicitante"
              initialValue={user?.name}
              rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
            >
              <Input placeholder="Coloque seu Sobrenome" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Documento"
              rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
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
