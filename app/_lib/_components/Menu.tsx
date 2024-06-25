"use client";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import {
  FileOutlined,
  HomeOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu as MenuAnt } from "antd";
import Sider from "antd/lib/layout/Sider";
import styled from "styled-components";
import useGetUser from "../_hooks/useGetUser";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "grp",
    type: "group",
    children: [
      { key: "/portal/dashboard", label: "Início", icon: <HomeOutlined /> },
      {
        key: "/portal/documentos",
        label: "Documentos",
        icon: <FileOutlined />,
      },
      { key: "/portal/conta", label: "Conta", icon: <UserOutlined /> },
    ],
  },
];

const admin = [{
  key: "sub2",
  label: "Usuários",
  icon: <UsergroupAddOutlined />,
  children: [
    { key: "/administrativo/usuarios", label: "Usuários" },
    { key: "/administrativo/empresas", label: "Empresas" },
  ],
}];

export default function Menu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useGetUser()
  const router = useRouter()
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setOpen(false);
    router.push(e.key);
  };

  return (
    <MenuContainer openMenu={open}>
      <MenuAnt
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={user?.type === 'ADMIN' ? [...items, ...admin] : items}
      />
    </MenuContainer>
  );
}

const MenuContainer = styled(Sider)<{ openMenu: boolean }>`
  width: 236px;
  height: 100vh;
  background: #fff;
  position: absolute;
  z-index: 10;
  transition: 0.2s linear;

  @media (max-width: 840px) {
    left: ${(props) => (props.openMenu ? "0px" : "-236px")};
  }
`;
