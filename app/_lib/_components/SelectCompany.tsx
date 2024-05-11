import { Select } from "antd";

export default function SelectCompany(){
    return(
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Selecione a Empresa"
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
        )
    }