"use client";
import {
  Breadcrumb,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Row,
  Tag,
  message,
} from "antd";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import TextArea from "antd/es/input/TextArea";
import useGetDocumentDetails from "@/app/_lib/_hooks/useGetDocumentDetails";
import { PulseLoader } from "react-spinners";
import { InboxOutlined, StarOutlined, UploadOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/assets/logo-i.png";
import Link from "next/link";
import Dragger from "antd/es/upload/Dragger";
import isAuth from "@/app/_lib/_components/isAuth";

const DocumentPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading } = useGetDocumentDetails(id);
  const date = dayjs(data?.expiration);

  const items = [
    {
      title: "Aberta",
    },
    {
      title: "Aguardando",
    },
    {
      title: "Finalizada",
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          width: "calc(100vw - 350px)",
          //   height: 'calc(100vh - 102px)',
          marginTop: 100,
          //   position: "absolute",
          //   left: 0,
          //   top: 0,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Image src={Logo} alt="Logo" width={50} />
          <PulseLoader color="#00264B" size={8} loading={true} />
        </div>
      </div>
    );
  }

  return (
    <Form layout="vertical" hideRequiredMark>
      <Breadcrumb
        items={[
          { title: <Link href="/portal/dashboard">Início</Link> },
          { title: <Link href="/portal/documentos">Documentos</Link> },
          {
            title: (
              <p style={{ color: "rgba(0, 0, 0, 0.45)" }}>{data?.document}</p>
            ),
          },
        ]}
        style={{ paddingBottom: 10 }}
      />
      <div style={{display: 'flex'}}>  
      <h2 style={{ fontWeight: 400, paddingBottom: 25, color: "#404040" }}>
        Detalhes da Solicitação
      </h2>
      <Tag color={'geekblue'} key={data?.status} style={{maxHeight: 20, marginTop: 6, marginLeft: 15}}>
              {data?.status}
            </Tag>
      </div>
      {/* <Steps
        size="small"
        direction="horizontal"
        status="process"
        style={{ padding: "0", marginBottom: 40, paddingTop: 20 }}
        current={1}
        labelPlacement="vertical"
        items={items}
      /> */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Empresa"
            rules={[{ required: true, message: "Coloque seu Nome" }]}
            initialValue={data?.companyId}
          >
            <Input value={data?.companyId} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="requester"
            label="Solicitante"
            initialValue={data?.requesterId}
            rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
          >
            <Input placeholder="Coloque seu Sobrenome" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Documento"
            rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
            initialValue={data?.document}
          >
            <Input
              value={data?.document}
              disabled
              styles={{ input: { color: "#666666", backgroundColor: "#fff" } }}
              onChange={(e) => console.log(e)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <p style={{ height: "22px", marginBottom: "8px" }}>Prazo</p>
          <ConfigProvider locale={locale}>
            <DatePicker
              defaultValue={date}
              contentEditable={false}
              format="DD-MM-YYYY"
              style={{ width: "100%" }}
            />
          </ConfigProvider>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Descrição"
            rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
            initialValue={data?.description}
          >
            <TextArea
              // onChange={(e) => setRequest({...request, description: e.target.value})}
              placeholder="Escreva uma descrição"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Upload"
            rules={[{ required: true, message: "Coloque seu Sobrenome" }]}
            initialValue={data?.document}
          >
            <Dragger
              name="file"
              action={`http://localhost:3009/document/upload/${data?.id}`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }}
              isImageUrl={(file) => data?.url !== ""}
              showUploadList={{
                showDownloadIcon: true,
                showRemoveIcon: true,
                removeIcon: (
                  <StarOutlined
                    onClick={(e) => console.log(e, "custom removeIcon event")}
                  />
                ),
              }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} documento enviado com sucesso`
                  );
                } else if (info.file.status === "error") {
                  message.error(`Ocorreu um erro ao enviar o documento ${info.file.name}.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Clique aqui ou arraste o documento para fazer o envio
              </p>
              <p className="ant-upload-hint">
                Selecione o documento solicitado, os formatos aceitos são pdf e
                word e excel.
              </p>
            </Dragger>
          </Form.Item>
        </Col>
        <Col span={12}></Col>
      </Row>
    </Form>
  );
};

export default isAuth(DocumentPage);
