"use client"
import isAuth from "../../_lib/_components/isAuth"
import Title from "antd/es/typography/Title"
import { Button, Select, Tabs, TabsProps } from "antd"
import TableAnt from "@/app/_lib/_components/TableAnt"
import Drawer from "@/app/_lib/_components/Drawer"
import { useState } from "react"
import useGetUser from "@/app/_lib/_hooks/useGetUser"

const Documents = () => {
    const { user } = useGetUser()
    const [openDrawer, setOpenDrawer] = useState(false)
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    console.log('user na page', user)

    const onChange = (key: string) => {
        console.log(key);
      };
      
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Todas',
          children: <TableAnt />,
        },
        {
          key: '2',
          label: 'Vencidas',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Pendentes',
          children: 'Content of Tab Pane 3',
        },
        {
          key: '4',
          label: 'Concluídas',
          children: 'Content of Tab Pane 3',
        },
      ];
      //color: '#00000E0'
    return (
      <div>
            <Title level={2} style={{textAlign: 'left', color: '#404040', fontWeight: 300}}>  
              Documentos
            </Title>
            <div style={{paddingBottom: 20, display: 'flex'}}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Filtrar Empresa"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                {
                    value: '1',
                    label: 'Ampla',
                },
                {
                    value: '2',
                    label: 'Prefeitura de Tapejara',
                },
                {
                    value: '3',
                    label: 'Ecoadubos',
                },
                {
                    value: '4',
                    label: 'Metasa',
                },
                {
                    value: '5',
                    label: 'Schio',
                },
                {
                    value: '6',
                    label: 'Brasil',
                },
                ]}
            />
            <Select
                defaultValue="lucy"
                style={{ width: 120, marginLeft: 10 }}
                onChange={handleChange}
                options={[
                    { value: 'jack', label: 'Leonardo' },
                    { value: 'lucy', label: 'Cássio' },
                    { value: 'Yiminghe', label: 'Rafael' },
                    { value: 'disabled', label: 'Katherine', disabled: true },
                ]}
            />
            <Button type="primary" disabled style={{marginLeft: 10}}>Filtrar</Button>
            <Button type="default" style={{marginLeft: 5}}>Limpar</Button>
            <Button type="primary" style={{marginLeft: 'auto'}} onClick={() => setOpenDrawer(true)}>Nova Solicitação</Button>
            </div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <Drawer open={openDrawer} setOpen={setOpenDrawer} />
        </div>
        )
}

export default isAuth(Documents)

const style = {
    title: {

    }
}