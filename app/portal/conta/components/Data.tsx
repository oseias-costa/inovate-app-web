import useGetUser from "@/app/_lib/_hooks/useGetUser";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Typography } from "antd";
import styled from "styled-components";
import DrawerUpdateUserData from "./DrawerUpdateUserData";
import { useEffect, useState } from "react";

export default function Data() {
  const { user } = useGetUser();
  const [open, setOpen] = useState(false)
  console.log(user, 'dentro de user')
  if (!user) {
    return <p>...Loading</p>;
  }

  return (
    <Container>
      <DrawerUpdateUserData open={open} setOpen={setOpen} />
      <InputBlock>
        <Avatar  icon={<UserOutlined />} style={{width: 46, height: 46}}/>
      </InputBlock>
      <InputBlock>
        <Typography style={{ fontWeight: 400, color: "#8c8c8c" }}>
          Nome:
        </Typography>
        <Input defaultValue={user?.name} />
      </InputBlock>
      <InputBlock type="left">
        <Typography style={{ fontWeight: 400, color: "#8c8c8c" }}>
          E-mail:
        </Typography>
        <Input defaultValue={user?.email} />
      </InputBlock>
      <Button type="default" onClick={() => setOpen(true)}>Editar informações</Button>
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
