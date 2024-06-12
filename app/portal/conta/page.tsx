"use client";
import isAuth from "@/app/_lib/_components/isAuth";
import useGetUser from "@/app/_lib/_hooks/useGetUser";
import { Breadcrumb, Col, Form, Input, Row, Tabs, TabsProps } from "antd";
import Link from "next/link";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Dados",
    children: "Content of Tab Pane 2",
  },
  {
    key: "2",
    label: "Senha",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Notificações",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Verificação",
    children: "Content of Tab Pane 3",
  },
];

const Account = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const { user } = useGetUser()
  console.log(user)
  if(!user){
    return <p>...Loading</p>
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/conta">Conta</Link> },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <h2 style={{ fontWeight: 400, paddingBottom: 16, color: "#404040" }}>
        Conta
      </h2>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <Row gutter={16}>
        <Col xs={11}>
          <Form.Item
            name="name"
            label="Nome"
            // rules={[{ required: true, message: "Coloque seu Nome" }]}
          >
            <Input defaultValue={user?.name}  />
          </Form.Item>
        </Col>
        <Col xs={11}>
          <Form.Item
            name="name"
            label="E-mail"
            // rules={[{ required: true, message: "Coloque seu Nome" }]}
          >
            <Input defaultValue={user?.email}  />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default isAuth(Account);
