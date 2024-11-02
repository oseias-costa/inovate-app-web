"use client"
import isAuth from "@/app/lib/components/isAuth";
import { Breadcrumb } from "antd";
import Link from "next/link";

const Configurations = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/configuracoes">Configurações</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Configurações
      </h2>
    </div>
  );
};

export default isAuth(Configurations);
