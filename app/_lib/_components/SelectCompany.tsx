import { useQueryClient } from "@tanstack/react-query";
import { Select } from "antd";
import { Dispatch, SetStateAction } from "react";
import useGetCompanys from "../_hooks/useGetCompanys";

type Options = {
  value: string;
  label: string;
};

type SelectCompanyProps = {
  setCompanys: Dispatch<SetStateAction<string>>;
  value?: string;
};

export default function SelectCompany({
  setCompanys,
  value,
}: SelectCompanyProps) {
  const { data } = useGetCompanys();
  const queryClient = useQueryClient();
  let options: Options[] = [];
  if (value) {
    options.push({ value: "1", label: value });
  } else {
    const convertData = data?.map((item: any) =>
      options.push({ value: item.id, label: item.name })
    );
  }

  return (
    <Select
      showSearch
      placeholder="Selecione a Empresa"
      optionFilterProp="children"
      style={{ marginRight: 10, marginBottom: 10 }}
      onSelect={(value) => {
        setCompanys(value);
        return queryClient.invalidateQueries({
          queryKey: ["document-page", 1],
        });
      }}
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
    />
  );
}
