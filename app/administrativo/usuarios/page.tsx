"use client"
import isAuth from "@/app/_lib/_components/isAuth";
import { Breadcrumb } from "antd";
import Link from "next/link";

const Users = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/administrativo">Administrativo</Link> },
          { title: <Link href="/administrativo/usuarios">Usuários</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Conta
      </h2>
    </div>
  );
};

export default isAuth(Users);
