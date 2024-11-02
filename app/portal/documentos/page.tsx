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

const Documents = () => {
  const { user } = useGetUser();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [company, setCompany] = useState("");
  const [filter, setFilter] = useState({ user: "", company: "" });
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    setFilter({ user: "", company: company });
  }, [company]);

  console.log("user na page", user);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Todas",
      children: <TableAnt filter={filter} setFilter={setFilter} />,
    },
    {
      key: "2",
      label: "Vencidas",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Pendentes",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Concluídas",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/documentos">Documentos</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Solicitações de documentos
      </h2>
      {user?.type === "USER" || user?.type === "ADMIN" && (
        <div style={{ paddingBottom: 10, display: "flex", flexWrap: "wrap" }}>
          <SelectCompany setCompanys={setCompany} />
          <Select
            defaultValue="lucy"
            onChange={handleChange}
            options={[
              { value: "jack", label: "Leonardo" },
              { value: "lucy", label: "Cássio" },
              { value: "Yiminghe", label: "Rafael" },
              { value: "disabled", label: "Katherine", disabled: true },
            ]}
          />
          <Button type="primary" disabled style={{ marginLeft: 10 }}>
            Filtrar
          </Button>
          <Button type="default" style={{ marginLeft: 5 }}>
            Limpar
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: "auto", marginRight: "20px" }}
            onClick={() => setOpenDrawer(true)}
          >
            <PlusOutlined /> Nova Solicitação
          </Button>
        </div>
      )}
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Drawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Documents);

const style = {
  title: {},
};
