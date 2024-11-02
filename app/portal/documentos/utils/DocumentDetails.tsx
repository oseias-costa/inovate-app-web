import { SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Upload,
  UploadProps,
  message,
} from "antd";
import SelectCompany from "@/app/lib/components/SelectCompany";
import locale from "antd/locale/pt_BR";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import TextArea from "antd/es/input/TextArea";
import useGetDocumentDetails from "@/app/lib/hooks/useGetDocumentDetails";
import { PulseLoader } from "react-spinners";
import { useIsMutating, useMutation } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";
import useUploadDocument from "./useUploadDocument";
import axios from "axios";

type DrawerComponentProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  id: string;
};

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
export default function DocumentDetails({
  open,
  setOpen,
  id,
}: DrawerComponentProps) {
  const { data } = useGetDocumentDetails(id);
  const [companys, setCompanys] = useState("");
  const date = dayjs(data?.expiration);
  const onClose = () => setOpen(false);
  const [file, setFile] = useState<File>()
  const isMutation = useIsMutating({ mutationKey: ["documents"], exact: true });

  console.log(data)
  const updateDocument = async (file: any) => {
    await axios({
      method: 'post',
      baseURL: `http://localhost:3009/document/upload/${data?.companyId}`,
      data: file,

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    })
  }

  const mutation = useMutation({
    mutationFn: updateDocument,
    mutationKey: [id]
  })

  useEffect(() => {
    if (mutation.error) {
      console.log(mutation.error)
    }
  }, [mutation])

  return (
    <Drawer
      title="Detalhes"
      width={720}
      onClose={onClose}
      open={open}
      styles={{ body: { paddingBottom: 80 } }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={() => mutation.mutate()} type="primary">
            {isMutation ? (
              <PulseLoader color="#fff" size={6} loading={true} />
            ) : (
              "Editar"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Empresa"
              rules={[{ required: true, message: "Coloque seu Nome" }]}
              initialValue={data?.companyId}
            >
              <SelectCompany
                value={data?.companyId}
                setCompanys={setCompanys}
              />
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
              <Input onChange={(e) => console.log(e)} />
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
              <Upload
                name="file"
                action={`http://localhost:3009/document/upload/${data?.companyId}`}
                // beforeUpload={async (file) => {
                //     // setFile(file)
                //     // mutation.mutate()
                //     await updateDocument(file)
                // }

                // } 
                headers={{
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                }
              >
                <Button style={{ marginBottom: 10 }} icon={<UploadOutlined />}>
                  Selecione o Documento
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>
    </Drawer>
  );
}
