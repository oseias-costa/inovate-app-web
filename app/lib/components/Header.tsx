import Image from "next/image";
import Logo from "@/public/auth/logo-clean.png";
import styled from "styled-components";
import { Avatar, Button } from "antd";
import { BellOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction } from "react";
import Notifications from "./Notifications";
import { queryClient } from "../config/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient()

  return (
    <Container>
      <MenuIcon onClick={() => setOpen(!open)} />
      <LogoStyle src={Logo} alt="" />
      <div>
        <Avatar icon={<UserOutlined />} />
        <Notifications
          button={
            <Button
              type="link"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['notifications'] })}
            >
              <BellOutlined style={{ fontSize: 24 }} />
            </Button>}
        />
      </div>
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
  height: 64px;

  @media (max-width: 840px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

const LogoStyle = styled(Image)`
  height: 50px;
  width: auto;

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

const Notification = styled(Button)`
  height: 50px;
  width: 50px;
`
