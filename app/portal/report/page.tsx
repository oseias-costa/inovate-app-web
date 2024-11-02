"use client";
import isAuth from "../../lib/components/isAuth";
import { Breadcrumb, Button, Tabs, TabsProps } from "antd";
import { useState } from "react";
import useGetUser from "@/app/lib/hooks/useGetUser";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import ReportTable from "@/app/lib/components/ReportTable";
import AddReportDrawer from "@/app/lib/components/AddReportDrawer";

const Report = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filter, setFilter] = useState({ user: "", company: "" });


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
        <PlusOutlined /> Novo relatório
      </Button>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <AddReportDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Report);
