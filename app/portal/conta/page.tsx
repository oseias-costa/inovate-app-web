"use client";
import isAuth from "@/app/lib/components/isAuth";
import { Breadcrumb, Tabs, TabsProps } from "antd";
import Link from "next/link";
import Data from "./components/Data";
import Password from "./components/Password";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Dados",
    children: <Data />,
  },
  {
    key: "2",
    label: "Senha",
    children: <Password />,
  }
];

const Account = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/conta">Conta</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 16, color: "#404040" }}>
        Conta
      </h2>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default isAuth(Account);
