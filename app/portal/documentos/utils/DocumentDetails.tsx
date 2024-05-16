import DrawerFC from "@/app/_lib/_components/DrawerFC";
import { SetStateAction } from "react";
import { Button, Col, ConfigProvider, DatePicker, DatePickerProps, Drawer, Form, Input, Row, Space} from 'antd'
import SelectCompany from "@/app/_lib/_components/SelectCompany";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DrawerComponentProps =  {
    open: boolean, 
    setOpen: React.Dispatch<SetStateAction<boolean>>
    id: string
}

export default function DocumentDetails({open, setOpen, id}:DrawerComponentProps){
    console.log(id)
    const {data} = useQuery({
        queryFn: async () => {
            const url = `http://localhost:3009/document/${id}`
            const document = await axios({
                baseURL: url,
                method: 'GET',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(url)
        return document.data
    }, 
        queryKey: ['document-detail'] 
    })

    console.log(data)
    return(
        <DrawerFC 
            title="Detalhes"
            children={<><p>{id}</p></>}
            buttonText="Editar"
            isLoading={false}
            onClick={() => console.log('onClick')}
            open={open}
            setOpen={setOpen}
        /> 
    )
}

const ContentForm = () => {
    const [companys, setCompanys] = useState('')
    return(
        <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                    name='name'
                    label='Empresa'
                    rules={[{required: true, message: 'Coloque seu Nome'}]}
                >
                    <SelectCompany setCompanys={setCompanys} />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name='requester'
                    label='Solicitante'
                    initialValue={'user?.name'}
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
                    >
                        <Input onChange={(e) => setRequest({...request, document: e.target.value})} />
                    </Form.Item>
            </Col>
            <Col span={12}>
                <p style={{height: '22px', marginBottom: '8px'}}>Prazo</p>
                    <ConfigProvider locale={locale}>
                        <DatePicker onChange={onChange}  style={{ width: '100%' }} /> 
                    </ConfigProvider>
            </Col>
            <Col span={12}>
                <Form.Item
                    name='lastName'
                    label='Descrição'
                    rules={[{required: true, message: 'Coloque seu Sobrenome'}]}
                >
                    <TextArea
                        onChange={(e) => setRequest({...request, description: e.target.value})} 
                        placeholder="Escreva uma descrição"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    /> 
                </Form.Item>
            </Col>
        </Row>
    </Form>
    )
}