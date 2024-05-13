"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Col, ConfigProvider, DatePicker, DatePickerProps, Drawer, Form, Input, Row, Space} from 'antd'
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/pt_BR";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import SelectCompany from "./SelectCompany";
import useGetUser from "../_hooks/useGetUser";
import { useQueryClient } from "@tanstack/react-query";

type DrawerComponentProps =  {
    open: boolean, 
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function DrawerComponent({ open, setOpen }:DrawerComponentProps){
    const [user, setUser] = useState({
        createAt: "",
        email: "",
        id: "",
        name: "",
        password: "",
        reamlID: "",
        status: "",
        type: "",
        updateAt: ""
    })
    const [companys, setCompanys] = useState('')
    const [request, setRequest] = useState({
        requesterId: '',
        companyId: companys,
        document: "",
        description: "",
        realmId: '',
        expiration: "",
    })
    // const { user } = useGetUser()
    const queryClient = useQueryClient()
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const getUser = queryClient.getQueriesData({queryKey: ['user']})[0][1]
    useEffect(() => {
        console.log(typeof getUser)
        setUser(getUser)
        setRequest({
            ...request,
            realmId: getUser?.reamlID,
            requesterId: user?.id
        })
    },[getUser])

    console.log('request', getUser)
    dayjs.locale('pt-br')


    const onClose = () => {
        setOpen(false)
    }

    return(
        <Drawer 
            title='Criar solicitação'
            width={720}
            onClose={onClose}
            open={open}
            styles={{ body: {paddingBottom: 80}}}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button onClick={onClose} type='primary'>Criar</Button>
                </Space>}
        >
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
                                initialValue={user?.name}
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
                                    <Input />
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
                                    placeholder="Autosize height with minimum and maximum number of lines"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                /> 
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
    )
}