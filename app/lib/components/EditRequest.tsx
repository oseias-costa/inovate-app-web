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
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/pt_BR";
import "dayjs/locale/pt-br";
import axios, { AxiosError } from "axios";
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import { httpClient } from "../utils/httpClient";
import dayjs from "dayjs";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  requestUuid: string
};

export default function EditRequest({
  open,
  setOpen,
  requestUuid
}: DrawerComponentProps) {
  const queryClient = useQueryClient();


  const { data } = useQuery({
    queryKey: [`request-${requestUuid}`],
    queryFn: async () => httpClient({
      path: `/requests/${requestUuid}`,
      method: 'GET'
    })
  })

  const onClose = () => {
    setOpen(false);
  };

  const isMutation = useIsMutating({ mutationKey: [`update-request-${requestUuid}`], exact: true });

  const mutation = useMutation({
    mutationFn: async () => httpClient({
      method: 'PATCH',
      path: `/requests/${requestUuid}`,
      data: request
    }),
    mutationKey: [`update-request-${requestUuid}`],
    onSuccess: () => {
      onClose();
      return queryClient.invalidateQueries({ queryKey: [`request-${requestUuid}`] })
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message)
      }
    }
  });

  const [request, setRequest] = useState({
    document: '',
    description: '',
    expiration: ''
  })

  useEffect(() => {
    setRequest({
      document: data?.documentName,
      description: data?.description,
      expiration: data?.expiration
    })
  }, [data])


  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    const d = new Date(date.toDate());
    setRequest({ ...request, expiration: d.toISOString() });
  };
  const date = dayjs(data?.expiration);

  return (
    <Drawer
      title="Editar solicitação"
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
              "Editar solicitação"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Form.Item
            name="name"
            label="Empresa"
            rules={[{ required: true, message: "Coloque seu Nome" }]}
          >
            <Input disabled defaultValue={data?.company} />
          </Form.Item>
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
                value={request?.document}
                defaultValue={data?.documentName}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <p style={{ height: "22px", marginBottom: "8px" }}>Prazo</p>
            <ConfigProvider locale={locale}>
              <DatePicker
                onChange={onChange}
                style={{ width: "100%" }}
                defaultValue={date}
                contentEditable={false}
                format="DD-MM-YYYY"
              />
            </ConfigProvider>
          </Col>
        </Row>
        <Form.Item
          name="lastName"
          label="Descrição"
          rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
        >
          <TextArea
            onChange={(e) =>
              setRequest({ ...request, description: e.target.value })
            }
            style={{ width: '100%' }}
            value={request.description}
            defaultValue={data?.description}
            placeholder="Escreva uma descrição"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
