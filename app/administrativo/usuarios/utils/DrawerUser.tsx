"use client";
import React, { SetStateAction, useState } from "react";
import { Button, Drawer, Form, Input, Space, message } from "antd";
import "dayjs/locale/pt-br";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import useGetUser from "@/app/lib/hooks/useGetUser";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function DrawerUser({ open, setOpen }: DrawerComponentProps) {
  const queryClient = useQueryClient();
  const { user } = useGetUser();
  const [userData, setUserData] = useState({
    type: "USER",
    name: "",
    email: "",
  });

  const onClose = () => {
    setOpen(false);
  };

  const postCreateCompany = async () => {
    const response = await axios({
      baseURL: "http://localhost:3009/users/create",
      method: "POST",
      data: { name: userData.name, email: userData.email, type: userData.type },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  };

  const isMutation = useIsMutating({
    mutationKey: [userData.email],
    exact: true,
  });

  const mutation = useMutation<any | AxiosError>({
    mutationFn: postCreateCompany,
    mutationKey: [userData.email],
    onSuccess: () => {
      onClose();
      message.success(`Empresa ${userData.name} adicionada!`)
      setUserData({ type: "USER", name: "", email: "" })
      return queryClient.invalidateQueries({ queryKey: ["companys"] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message[0])
      }
    },
  });

  return (
    <Drawer
      title="Adicionar"
      width={400}
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
              "Adicionar"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark style={{ width: "100%" }}>
        <p style={{ paddingBottom: 18, color: "#00000073" }}>
          Uma mensagem de boas vindas será enviado para o e-mail após adicionar
          o usuário.
        </p>
        <Form.Item
          name="name"
          label="Nome do Usuário"
          rules={[{ required: true, message: "Coloque o nome do usuário" }]}
        >
          <Input
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Email"
          rules={[{ required: true, message: "Coloque o e-mail" }]}
        >
          <Input
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
