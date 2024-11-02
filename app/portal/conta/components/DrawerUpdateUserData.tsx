"use client";
import React, { SetStateAction, useEffect, useState } from "react";
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
import Spinner from "@/app/lib/components/Spinner";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function DrawerUpdateUserData({ open, setOpen }: DrawerComponentProps) {
  const queryClient = useQueryClient();
  const { user } = useGetUser();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const onClose = () => {
    setOpen(false);
  };

  const postCreateCompany = async () => {
    const response = await axios({
      baseURL: "http://localhost:3009/users/update-informations",
      method: "PATCH",
      data: { name: userData.name },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  };

  const isMutation = useIsMutating({
    mutationKey: [user?.email],
    exact: true,
  });

  const mutation = useMutation<any | AxiosError>({
    mutationFn: postCreateCompany,
    mutationKey: [user?.email],
    onSuccess: () => {
      onClose();
      message.success(`Nome ${userData.name} alterado!`)
      return queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message[0])
      }
    },
  });

  if (!user) {
    return <Spinner />
  }

  return (
    <Drawer
      title="Editar"
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
              "Salvar"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" style={{ width: "100%" }}>
        <p style={{ paddingBottom: 18, color: "#00000073" }}>
          Para alterar o e-mail solicite ao administrador do sistema.
        </p>
        <Form.Item
          name="name"
          label="Nome do Usuário"
          rules={[{ message: "Coloque o nome do usuário" }]}
        >
          <Input
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            defaultValue={user?.name}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Email"
          rules={[{ message: "Coloque o e-mail" }]}
        >
          <Input
            disabled
            defaultValue={user?.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
