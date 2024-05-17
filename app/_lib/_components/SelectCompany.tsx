import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import useGetCompanys from "../_hooks/useGetCompanys";

type Options = {
    value: string,
    label: string
}

type SelectCompanyProps = {
    setCompanys: Dispatch<SetStateAction<string>>,
    value?: string
}

export default function SelectCompany({setCompanys, value}: SelectCompanyProps){
    const {data} = useGetCompanys()
    let options: Options[] = []
    if(value){
        options.push({value: '1', label: value})
    } else {
        const convertData = data?.map((item: any) => 
            options.push({value: item.id, label: item.name}))
    }

    return(
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Selecione a Empresa"
                optionFilterProp="children"
                onSelect={(value) => setCompanys(value)}
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={options}
            />
        )
    }