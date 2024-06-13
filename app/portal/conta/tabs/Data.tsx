import useGetUser from "@/app/_lib/_hooks/useGetUser";
import { Col, Form, Input, Row } from "antd";

export default function Data() {
  const { user } = useGetUser();
  
  if (!user) {
    return <p>...Loading</p>;
  }

  return (
    <>
      <Row gutter={16}>
        <Col xs={11}>
          <Form.Item
            name="name"
            label="Nome"
            // rules={[{ required: true, message: "Coloque seu Nome" }]}
          >
            <Input defaultValue={user?.name} />
          </Form.Item>
        </Col>
        <Col xs={11}>
          <Form.Item
            name="name"
            label="E-mail"
            // rules={[{ required: true, message: "Coloque seu Nome" }]}
          >
            <Input defaultValue={user?.email} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
