"use client";
import isAuth from "@/app/_lib/_components/isAuth";
import { Breadcrumb, Button, Tabs, TabsProps } from "antd";
import Link from "next/link";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import DrawerCompany from "./utils/DrawerUser";
import TableActiveUser from "./utils/TableActiveUser";
import TableInactiveUsers from "./utils/TableInactiveUsers";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Ativos",
    children: <TableActiveUser />,
  },
  {
    key: "2",
    label: "Inativos",
    children: <TableInactiveUsers />,
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const Users = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/administrativo">Administrativo</Link> },
          { title: <Link href="/administrativo/usuarios">Usuários</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{display: 'flex'}}>

      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Usuários
      </h2>
      <Button
        type="primary"
        style={{ marginLeft: "auto", marginRight: "20px" }}
        onClick={() => setOpenDrawer(true)}
        >
        <PlusOutlined /> Adicionar Usuário
      </Button>
    </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <DrawerCompany open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
};

export default isAuth(Users);
