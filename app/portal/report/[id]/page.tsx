"use client";
import {
  Breadcrumb,
  Form,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { PulseLoader } from "react-spinners";
import { useParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/assets/logo-i.png";
import Link from "next/link";
import isAuth from "@/app/lib/components/isAuth";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/app/lib/utils/httpClient";

const ReportDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const items = [
    {
      title: "Aberta",
    },
    {
      title: "Aguardando",
    },
    {
      title: "Finalizada",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['request' + id],
    queryFn: async () => httpClient({
      path: `/reports/${id}`,
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
          { title: <Link href="/portal/report">Relatórios</Link> },
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
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
    </Form>
  );
};

export default isAuth(ReportDetails);
