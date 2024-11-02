import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Document } from "../types/document.type";
import DocumentDetails from "@/app/portal/documentos/utils/DocumentDetails";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import useGetUser from "../hooks/useGetUser";
import { httpClient } from "../utils/httpClient";
import { Notice } from "../types/notice.type";
import { Report } from "../types/report.type";

interface DataType {
  uuid: string
  title: string;
  company: string;
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

const ReportTable = ({ filter, setFilter, status }: TableDocumentsProps) => {
  const [openDocumentDetais, setOpenDocumentDetais] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useGetUser();
  const [pagination, setPagination] = useState({ page: "1", limit: "6" });

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
      title: "Empresa",
      dataIndex: "company",
      key: "company",
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
              router.push(`/portal/report/${record.uuid}`);
              return queryClient.invalidateQueries({
                queryKey: ["report-detail"],
              });
            }}
          >
            Ver
          </Button>
        </Space>
      ),
    },
  ];

  const { data, isLoading } = useQuery<Reports>({
    queryKey: [`report-page`, pagination.page],
    queryFn: async () => httpClient({
      path: '/reports',
      method: 'GET',
      queryString: {
        page: pagination.page,
        limit: pagination.limit,
        companyUuid: '93ef1356-761d-11ef-84ca-047c62762b75',
      }
    })
  });

  type Reports = {
    items: Report[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };

  let options: DataType[] = [];
  const convertData = data?.items?.map((item: any) => {
    options.push({
      uuid: item.uuid,
      title: item.title,
      company: item.company,
      createdAt: item.createdAt,
    });
  });

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
          current: data?.meta.currentPage,
          pageSize: data?.meta.itemsPerPage,
          total: data?.meta.totalItems,
        }}
        onChange={(item) => {
          setPagination({ ...pagination, page: String(item["current"]) });
        }}
        style={{ width: "calc(100vw - 326px)" }}
      />
    </>
  );
};

export default ReportTable;
