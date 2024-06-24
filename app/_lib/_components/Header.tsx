import Image from "next/image";
import Logo from "@/public/auth/logo-clean.png";
import styled from "styled-components";
import { Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction } from "react";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Container>
      <MenuIcon onClick={() => setOpen(!open)} />
      <LogoStyle src={Logo} alt="" />
      <Avatar icon={<UserOutlined />} />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 100vw;
  padding-left: 50px;
  padding-right: 50px;

  @media (max-width: 840px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const LogoStyle = styled(Image)`
  height: 50px;
  width: auto;
  margin-top: auto;

  @media (max-width: 840px) {
    margin-right: 0 auto;
  }
`;

const MenuIcon = styled(MenuOutlined)`
  display: none;
  @media (max-width: 840px) {
    display: block;
  }

`;
