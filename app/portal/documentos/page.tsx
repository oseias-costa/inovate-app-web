"use client";
import isAuth from "../../_lib/_components/isAuth";
import Title from "antd/es/typography/Title";
import { Breadcrumb, Button, Select, Tabs, TabsProps } from "antd";
import TableAnt from "@/app/_lib/_components/TableAnt";
import Drawer from "@/app/_lib/_components/Drawer";
import { useState } from "react";
import useGetUser from "@/app/_lib/_hooks/useGetUser";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";

const Documents = () => {
  const { user } = useGetUser();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  console.log("user na page", user);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Todas",
      children: <TableAnt />,
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
  //color: '#00000E0'
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/documentos">Documentos</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040", }}>
        Solicitações de documentos
      </h2>
      <div style={{ paddingBottom: 20, display: "flex" }}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Filtrar Empresa"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "Ampla",
            },
            {
              value: "2",
              label: "Prefeitura de Tapejara",
            },
            {
              value: "3",
              label: "Ecoadubos",
            },
            {
              value: "4",
              label: "Metasa",
            },
            {
              value: "5",
              label: "Schio",
            },
            {
              value: "6",
              label: "Brasil",
            },
          ]}
        />
        <Select
          defaultValue="lucy"
          style={{ width: 120, marginLeft: 10 }}
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
          style={{ marginLeft: "auto", marginRight: '20px' }}
          onClick={() => setOpenDrawer(true)}
        >
          <PlusOutlined /> Nova Solicitação
        </Button>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Drawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Documents);

const style = {
  title: {},
};
