"use client";
import isAuth from "../../lib/components/isAuth";
import Title from "antd/es/typography/Title";
import { Breadcrumb, Button, Select, Tabs, TabsProps } from "antd";
import Drawer from "@/app/lib/components/AddRequestDrawer";
import { useEffect, useState } from "react";
import useGetUser from "@/app/lib/hooks/useGetUser";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import SelectCompany from "@/app/lib/components/SelectCompany";
import RequestsTable from "@/app/lib/components/RequestsTable";
import NoticeTable from "@/app/lib/components/NoticeTable";
import AddNoticeDrawer from "@/app/lib/components/AddNoticeDrawer";

const Documents = () => {
  const { user } = useGetUser();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [company, setCompany] = useState<string | string[]>("");
  const [filter, setFilter] = useState({ user: "", company: "" });
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    setFilter({ user: "", company: "" });
  }, [company]);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Todos",
      children: <NoticeTable filter={filter} setFilter={setFilter} status="" />,
    },
    {
      key: "2",
      label: "Gerais",
      children: <NoticeTable filter={filter} setFilter={setFilter} status="PENDING" />,
    },
    {
      key: "3",
      label: "Financeiro",
      children: <NoticeTable filter={filter} setFilter={setFilter} status="DUE" />,
    },
    {
      key: "4",
      label: "Prazos",
      children: <NoticeTable filter={filter} setFilter={setFilter} status="FINISH" />,
    },
  ]

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/notice">Avisos</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{ display: 'flex' }}>
        <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
          Avisos
        </h2>
        <Button
          type="primary"
          style={{ marginLeft: "auto", marginRight: "20px" }}
          onClick={() => setOpenDrawer(true)}
        >
          <PlusOutlined /> Novo aviso
        </Button>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <AddNoticeDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Documents);
