"use client";
import {
  Breadcrumb,
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Tag,
  message,
} from "antd";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { PulseLoader } from "react-spinners";
import { useParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/assets/logo-i.png";
import Link from "next/link";
import Dragger from "antd/es/upload/Dragger";
import isAuth from "@/app/lib/components/isAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/app/lib/utils/httpClient";
import { useState } from "react";
import EditNotice from "@/app/lib/components/EditNotice";

const NoticeDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const [openDrawer, setOpenDrawer] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: [`notice-${id}`],
    queryFn: async () => httpClient({
      path: `/notice/${id}`,
      method: 'GET'
    })
  })

  const date = dayjs(data?.expiration);

  if (isLoading) {
    return (
      <div
        style={{
          width: "calc(100vw - 350px)",
          marginTop: 100,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Image src={Logo} alt="Logo" width={50} />
          <PulseLoader color="#00264B" size={8} loading={true} />
        </div>
      </div>
    );
  }

  return (
    <Form layout="vertical" hideRequiredMark>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/notice">Avisos</Link> },
          {
            title: (
              <p style={{ color: "rgba(0, 0, 0, 0.45)" }}>{data?.title}</p>
            ),
          },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{ display: 'flex' }}>
        <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
          {data.title}
        </h2>
        <Button onClick={() => {
          setOpenDrawer(true)
          return queryClient.invalidateQueries({ queryKey: [`notice-${id}`] })
        }}>Editar</Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
      <EditNotice open={openDrawer} setOpen={setOpenDrawer} noticeUuid={data?.uuid} />
    </Form>
  );
};

export default isAuth(NoticeDetail);
