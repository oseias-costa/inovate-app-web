"use client"
import isAuth from "@/app/_lib/_components/isAuth";
import { Breadcrumb } from "antd";
import Link from "next/link";

const Account = () => {
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/conta">Conta</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Conta
      </h2>
    </div>
  );
};

export default isAuth(Account);
