"use client";
import {
  Breadcrumb,
  Button,
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
import { useState } from "react";
import EditReport from "@/app/lib/components/EditReport";

const ReportDetails = () => {
  const params = useParams();
  const id = params.id as string;
  const [openDrawer, setOpenDrawer] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: [`report-${id}`],
    queryFn: async () => httpClient({
      path: `/reports/${id}`,
      method: 'GET'
    })
  })

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
      <EditReport
        setOpen={setOpenDrawer}
        open={openDrawer}
        key={id}
        reportUuid={id}
      />
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
        <Button onClick={() => setOpenDrawer(true)}>Editar</Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
    </Form>
  );
};

export default isAuth(ReportDetails);
