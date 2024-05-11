"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Col, ConfigProvider, DatePicker, DatePickerProps, Drawer, Form, Input, Row, Space} from 'antd'
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/pt_BR";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import SelectCompany from "./SelectCompany";

type DrawerComponentProps =  {
    open: boolean, 
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function DrawerComponent({ open, setOpen }:DrawerComponentProps){
    dayjs.locale('pt-br')
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };
      

    const showDrawer = () => {
        setOpen(true)
    }

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
                                <SelectCompany />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='lastName'
                                label='Solicitante'
                                rules={[{required: true, message: 'Coloque seu Sobrenome'}]}
                            >
                                <Input placeholder="Coloque seu Sobrenome" />
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
                                    <Input value={'Leonardo Borilli'}  disabled/>
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
                                initialValue='Leonardo Borilli'
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