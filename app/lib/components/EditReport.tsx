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
import { AxiosError } from "axios";
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import PulseLoader from "react-spinners/PulseLoader";
import Tiptap from "./Tiptap";
import { httpClient } from "../utils/httpClient";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  reportUuid: string
};

export default function EditReport({
  open,
  setOpen,
  reportUuid
}: DrawerComponentProps) {
  const { data, refetch } = useQuery({
    queryKey: [`report-${reportUuid}`],
    queryFn: async () => httpClient({
      method: 'GET',
      path: `/reports/${reportUuid}`
    })
  })

  const [title, setTitle] = useState(data?.title)
  const [text, setText] = useState(data?.text)
  const queryClient = useQueryClient();

  const editNotice = useMutation({
    mutationKey: [`edit-report-${reportUuid}`],
    mutationFn: async () => await httpClient({
      path: `/reports/${reportUuid}`,
      method: 'PATCH',
      data: {
        title,
        text,
      }
    }),
    onSuccess: () => {
      setOpen(false)
      setTitle('')
      setText('')
      refetch()
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
      title="Editar relatório"
      width={720}
      onClose={() => setOpen(false)}
      open={open}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => editNotice.mutate()} type="primary">
            {isMutation ? (
              <PulseLoader color="#fff" size={6} loading={true} />
            ) : (
              "Editar"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "Coloque um título" }]}
        >
          <Input
            defaultValue={data?.title}
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
          <Tiptap setText={setText} text={data?.text} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
