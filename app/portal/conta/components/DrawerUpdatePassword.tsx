"use client";
import React, { SetStateAction, useState } from "react";
import { Button, Drawer, Form, Input, Space, message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useIsMutating,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import useGetUser from "@/app/_lib/_hooks/useGetUser";
import Spinner from "@/app/_lib/_components/Spinner";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function DrawerUpdatePassword({
  open,
  setOpen,
}: DrawerComponentProps) {
  const queryClient = useQueryClient();
  const { user } = useGetUser();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const onClose = () => {
    setOpen(false);
  };

  const postCreateCompany = async () => {
    const response = await axios({
      baseURL: "http://localhost:3009/users/update-password-logged",
      method: "POST",
      data: passwordData,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  };

  const isMutation = useIsMutating({
    mutationKey: ["password"],
    exact: true,
  });

  const mutation = useMutation<any | AxiosError>({
    mutationFn: postCreateCompany,
    mutationKey: ["password"],
    onSuccess: () => {
      onClose();
      message.success(`Nova senha salva!`);
      setPasswordData({
        oldPassword: "",
        password: "",
        passwordConfirmation: "",
      });
      return queryClient.invalidateQueries({ queryKey: ["password"] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message[0]);
      }
    },
  });

  if (!user) {
    return <Spinner />;
  }

  return (
    <Drawer
      title="Senha"
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
          Coloque a senha desejada abaixo.
        </p>
        <Form.Item
          name="atual-password"
          label="Senha atual"
          rules={[{ message: "Coloque a senha atual", min: 6 }]}
        >
          <Input
            onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Nova senha"
          rules={[{ message: "Coloque a nova senha", min: 6}]}
        >
          <Input
            onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Confirme a senha"
          rules={[{ message: "Confirme a senha", min: 6 }]}
        >
          <Input
            onChange={(e) =>
              setPasswordData({ ...passwordData, passwordConfirmation: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
