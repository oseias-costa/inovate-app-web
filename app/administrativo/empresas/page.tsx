"use client";
import isAuth from "@/app/lib/components/isAuth";
import { Breadcrumb, Button, Tabs, TabsProps } from "antd";
import Link from "next/link";
import TableCompanys from "./utils/TableActiveCompanys";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import DrawerCompany from "./utils/DrawerCompany";
import TableActiveCompanys from "./utils/TableActiveCompanys";
import TableDesactiveCompanys from "./utils/TableDesactiveCompanys";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Ativas",
    children: <TableActiveCompanys />,
  },
  {
    key: "2",
    label: "Inativas",
    children: <TableDesactiveCompanys />,
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const Companys = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/administrativo">Administrativo</Link> },
          { title: <Link href="/administrativo/empresas">Empresas</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{ display: 'flex' }}>

        <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
          Empresas
        </h2>
        <Button
          type="primary"
          style={{ marginLeft: "auto", marginRight: "20px" }}
          onClick={() => setOpenDrawer(true)}
        >
          <PlusOutlined /> Adicionar Empresa
        </Button>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <DrawerCompany open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Companys);
