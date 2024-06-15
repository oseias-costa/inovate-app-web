import useGetUser from "@/app/_lib/_hooks/useGetUser";
import { Input, Typography } from "antd";
import styled from "styled-components";

export default function Data() {
  const { user } = useGetUser();

  if (!user) {
    return <p>...Loading</p>;
  }

  return (
    <Container>
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
