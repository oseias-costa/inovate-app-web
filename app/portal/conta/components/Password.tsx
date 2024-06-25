import useGetUser from "@/app/_lib/_hooks/useGetUser";
import { UserOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Input, Typography } from "antd";
import styled from "styled-components";
import DrawerUpdateUserData from "./DrawerUpdateUserData";
import { useState } from "react";
import DrawerUpdatePassword from "./DrawerUpdatePassword";

export default function Password() {
  const { user } = useGetUser();
  const [open, setOpen] = useState(false);

  console.log(user);
  if (!user) {
    return <p>...Loading</p>;
  }

  return (
    <Container>
      <DrawerUpdatePassword open={open} setOpen={setOpen} />
      <Alert
        message="Para alterar sua senha clique no botão abaixo, lembre-se de colocar uma senha segura e não compartilhar com ninguém."
        type="info"
        showIcon
        style={{
          marginBottom: 20,
          maxWidth: 350
        }}
      />
      <Button type="default" onClick={() => setOpen(true)}>
        Atualizar senha
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: "flex";
`;

const InputBlock = styled.div<{ type?: "left" | "right" }>`
  width: 350px;
  margin-bottom: 15px;
  margin-left: ${(props) => (props.type === "left" ? "10px" : "0px")}

  @media(max-width: 840px){
    margin-left: 0px
    }
  }
`;
