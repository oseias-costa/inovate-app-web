import { Button, Drawer, Space } from "antd"
import React, { ReactNode, SetStateAction } from "react"
import PulseLoader from "react-spinners/PulseLoader"

type DrawerComponentProps =  {
    open: boolean, 
    setOpen: React.Dispatch<SetStateAction<boolean>>
    onClick: () => void
    isLoading: boolean
    title: string
    buttonText: string,
    children: ReactNode
}

export default function DrawerFC({ 
    open, setOpen, onClick, isLoading = false, children, buttonText, title 
}:DrawerComponentProps){
    return(
        <Drawer 
            title={title}
            width={720}
            onClose={() => setOpen(false)}
            open={open}
            styles={{ body: {paddingBottom: 80}}}
            extra={
                <Space>
                    <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={onClick} type='primary'>
                        { isLoading 
                        ? <PulseLoader  color="#fff" size={6} loading={true} /> 
                        : buttonText }
                    </Button>
                </Space>}
        >
            {children}
        </Drawer>
    )
}