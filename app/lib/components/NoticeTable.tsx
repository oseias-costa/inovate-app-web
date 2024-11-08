import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DocumentDetails from "@/app/portal/documentos/utils/DocumentDetails";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { httpClient } from "../utils/httpClient";
import { Notice } from "../types/notice.type";
import { useUser } from "./UserProvider";
import { Pagination } from "../types/pagination.type";

interface DataType {
  uuid: string
  title: string;
  user: string;
  createdAt: string;
}

type TableDocumentsProps = {
  filter: {
    user: string;
    company: string;
  };
  setFilter: Dispatch<SetStateAction<{ user: string; company: string }>>;
  status: '' | 'PENDING' | 'DUE' | 'FINISH'
};

const NoticeTable = ({ filter, setFilter, status }: TableDocumentsProps) => {
  const [openDocumentDetais, setOpenDocumentDetais] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [pagination, setPagination] = useState({ page: "1", limit: "6" });
  const { user } = useUser()

  useEffect(() => {
    if (user?.type === "COMPANY") {
      setFilter({ ...filter, company: user.id });
    }
  }, [user]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Usuário",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => {
        const date = dayjs(v).format("DD-MM-YYYY");
        return <p>{date}</p>;
      },
    },
    {
      title: "Ver",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            style={{ color: "#1677ff" }}
            onClick={() => {
              router.push(`/portal/notice/${record.uuid}`);
              return queryClient.invalidateQueries({
                queryKey: ["notice-detail"],
              });
            }}
          >
            Ver
          </Button>
        </Space>
      ),
    },
  ];

  const { data: docs, isLoading, refetch } = useQuery<Pagination<Notice>>({
    queryKey: [`notice-page`, pagination.page],
    queryFn: async () => httpClient({
      path: '/notice',
      method: 'GET',
      queryString: {
        page: pagination.page,
        limit: pagination.limit,
        uuid: user?.uuid,
      }
    })
  });

  let options: DataType[] = [];
  const convertData = docs?.items?.map((item: any) => {
    options.push({
      uuid: item.uuid,
      title: item.title,
      user: item.user,
      createdAt: item.createdAt,
    });
  });

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <DocumentDetails
        open={openDocumentDetais}
        setOpen={setOpenDocumentDetais}
        id={documentId}
      />
      <Table
        columns={columns}
        dataSource={options}
        pagination={{
          current: docs?.meta.currentPage,
          pageSize: docs?.meta.itemsPerPage,
          total: docs?.meta.totalItems,
        }}
        onChange={(item) => {
          setPagination({ ...pagination, page: String(item["current"]) });
        }}
        style={{ width: "calc(100vw - 326px)" }}
      />
    </>
  );
};

export default NoticeTable;
