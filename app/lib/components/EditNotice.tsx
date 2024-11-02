"use client";
import React, { SetStateAction, useEffect, useState } from "react";
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
  noticeUuid: string
};

export default function EditNotice({
  open,
  setOpen,
  noticeUuid
}: DrawerComponentProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const { data, refetch } = useQuery({
    queryKey: [`notice-${noticeUuid}`],
    queryFn: async () => httpClient({
      method: 'GET',
      path: `notice/${noticeUuid}`
    })
  })

  useEffect(() => {
    setTitle(data?.title)
    setText(data?.text)
  }, [data])

  const editNotice = useMutation({
    mutationKey: [`edit-notice-${noticeUuid}`],
    mutationFn: async () => await httpClient({
      path: `/notice/${noticeUuid}`,
      method: 'PATCH',
      data: {
        title,
        text
      }
    }),
    onSuccess: () => {
      setOpen(false)
      setTitle('')
      setText('')
      refetch()
      return queryClient.invalidateQueries({ queryKey: ["notice-page", `notice-${noticeUuid}`] });
    },
    onError: (error: AxiosError | any) => {
      if (error.response) {
        message.error(error.response?.data.message)
      }
    }
  })

  const isMutation = useIsMutating({ mutationKey: [`edit-notice-${noticeUuid}`], exact: true });
  return (
    <Drawer
      title="Editar aviso"
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
          label="Aviso"
          rules={[{ required: true, message: "Preencha o aviso" }]}
        >
          <Tiptap setText={setText} text={data?.text} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
