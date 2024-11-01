import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select } from "antd";
import { Dispatch, SetStateAction } from "react";
import { httpClient } from "../_utils/httpClient";

type Options = {
  value: { uuid: string, name: string };
  label: string;
};

type SelectUsersProps = {
  setUsers: Dispatch<SetStateAction<string | string[]>>;
  mode?: 'multiple' | 'tags'
  users: string | string[]
};

export default function SelectUsers({
  setUsers,
  mode,
  users
}: SelectUsersProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => httpClient({
      method: 'GET',
      path: '/users/get-users'
    })
  })

  let options: Options[] = [];

  if (data) {
    data?.map((item: any) =>
      options.push({ value: item.uuid, label: item.name })
    );
  }
  return (
    <Select
      mode={mode}
      showSearch
      placeholder="Selecione os usuários"
      optionFilterProp="children"
      style={{ marginRight: 10, marginBottom: 10, width: '100%' }}
      onSelect={(value) => {
        if (mode === 'multiple') {
          if (typeof users !== 'string') {
            return setUsers([...users, value])
          }
          return setUsers([value])

        }
        setUsers(value);
        return queryClient.invalidateQueries({
          queryKey: ["users", 1],
        });
      }}
      onDeselect={(value) => {
        if (typeof users !== 'string' && users.includes(value)) {
          const list = users.filter((item: string) => item !== value)
          return setUsers([...list])
        }

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
