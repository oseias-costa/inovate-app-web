"use client";
import { useQueryClient } from "@tanstack/react-query";
import isAuth from "../../lib/components/isAuth";
import Header from "../../lib/components/Header";
import { Breadcrumb } from "antd";
import Link from "next/link";

const Dashboard = () => {
  const user = useQueryClient().getQueryData(["user"]);
  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Dashboard
      </h2>
    </div>
  );
};

export default isAuth(Dashboard);
