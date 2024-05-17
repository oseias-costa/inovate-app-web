import { SetStateAction, useState } from "react";
import { Button, Col, ConfigProvider, DatePicker, Drawer, Form, Input, Row, Space } from 'antd'
import SelectCompany from "@/app/_lib/_components/SelectCompany";
import locale from "antd/locale/pt_BR";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import TextArea from "antd/es/input/TextArea";
import useGetDocumentDetails from "@/app/_lib/_hooks/useGetDocumentDetails";
import { PulseLoader } from "react-spinners";
import { useIsMutating } from "@tanstack/react-query";

type DrawerComponentProps =  {
    open: boolean, 
    setOpen: React.Dispatch<SetStateAction<boolean>>
    id: string
}

export default function DocumentDetails({open, setOpen, id}:DrawerComponentProps){
    const { data } = useGetDocumentDetails(id)
    const [companys, setCompanys] = useState('')
    const date = dayjs(data?.expiration)
    const onClose = () => setOpen(false)
    const isMutation = useIsMutating({ mutationKey: ['documents'], exact: true})

    return(
        <Drawer 
            title='Detalhes'
            width={720}
            onClose={onClose}
            open={open}
            styles={{ body: {paddingBottom: 80}}}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={() => mutation.mutate()} type='primary'>
                        { isMutation 
                        ? <PulseLoader  color="#fff" size={6} loading={true} /> 
                        : 'Editar' }
                    </Button>
                </Space>}
        >
        <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    name='name'
                    label='Empresa'
                    rules={[{required: true, message: 'Coloque seu Nome'}]}
                    initialValue={data?.companyId}
                >
                    <SelectCompany value={data?.companyId} setCompanys={setCompanys} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name='requester'
                    label='Solicitante'
                    initialValue={data?.requesterId}
                    rules={[{required: true, message: 'Coloque seu Sobrenome'}]}
                >
                    <Input placeholder="Coloque seu Sobrenome" disabled />
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                        name='description'
                        label='Documento'
                        rules={[{required: true, message: 'Coloque seu Sobrenome'}]}
                        initialValue={data?.document}
                    >
                        <Input onChange={(e) => console.log(e)} />
                    </Form.Item>
            </Col>
            <Col span={12}>
                <p style={{height: '22px', marginBottom: '8px'}}>Prazo</p>
                    <ConfigProvider locale={locale}>
                        <DatePicker defaultValue={date} contentEditable={false} format="DD-MM-YYYY" style={{ width: '100%' }} /> 
                    </ConfigProvider>
            </Col>
            <Col span={12}>
                <Form.Item
                    name='lastName'
                    label='Descrição'
                    rules={[{required: true, message: 'Coloque seu Sobrenome'}]}
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
    </Form>
    </Drawer>
    )
}