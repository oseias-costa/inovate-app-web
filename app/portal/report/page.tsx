"use client";
import isAuth from "../../_lib/_components/isAuth";
import Title from "antd/es/typography/Title";
import { Breadcrumb, Button, Select, Tabs, TabsProps } from "antd";
import Drawer from "@/app/_lib/_components/Drawer";
import { useEffect, useState } from "react";
import useGetUser from "@/app/_lib/_hooks/useGetUser";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import SelectCompany from "@/app/_lib/_components/SelectCompany";
import RequestsTable from "@/app/_lib/_components/RequestsTable";
import NoticeTable from "@/app/_lib/_components/NoticeTable";
import ReportTable from "@/app/_lib/_components/ReportTable";

const Documents = () => {
  const { user } = useGetUser();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [company, setCompany] = useState<string | string[]>("");
  const [filter, setFilter] = useState({ user: "", company: "" });
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Todas",
      children: <ReportTable filter={filter} setFilter={setFilter} status="" />,
    },
    {
      key: "2",
      label: "Pendentes",
      children: <ReportTable filter={filter} setFilter={setFilter} status="PENDING" />,
    },
    {
      key: "3",
      label: "Vencidas",
      children: <ReportTable filter={filter} setFilter={setFilter} status="DUE" />,
    },
    {
      key: "4",
      label: "Concluídas",
      children: <ReportTable filter={filter} setFilter={setFilter} status="FINISH" />,
    },
  ]

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/report">Relatórios</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Relatórios
      </h2>
      <Button
        type="primary"
        style={{ marginLeft: "auto", marginRight: "20px" }}
        onClick={() => setOpenDrawer(true)}
      >
        <PlusOutlined /> Nova Solicitação
      </Button>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Drawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Documents);
