import { Tag } from "antd";
import { isSortField, tableSorter } from "../../../../shared/utils/table";
import styles from "./index.module.scss";
import { statusToColor, statusToText } from "./utils";
export const useColumns = ({ sortField, sortOrder }: any) => [
  {
    title: "Creation Date",
    dataIndex: "createdAt",
    render: (text: any) => (
      <div className="text-center">{new Date(text).toLocaleDateString()}</div>
    ),
    width: 150,
    sorter: {
      compare: (a: any, b: any) => tableSorter(a.createdAt, b.createdAt),
    },
    sortOrder: isSortField(sortField, sortOrder, "createdAt"),
  },
  {
    title: `Reference Number`,
    dataIndex: "referenceNumber",
    width: 150,
    render: (referenceNumber: any) => (
      <div className="text-center">{referenceNumber}</div>
    ),
  },
  {
    title: `Survey Number`,
    dataIndex: "surveyNumber",
    width: 150,
    render: (surveyNumber: any) => (
      <div className="text-center">{surveyNumber}</div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status: any) => (
      <>
        <Tag color={statusToColor[status as keyof typeof statusToColor]}>
          {statusToText[status as keyof typeof statusToText]}
        </Tag>
      </>
    ),
    width: 200,
    sorter: true,
    sortOrder: isSortField(sortField, sortOrder, "status"),
  },
  {
    title: "Applicant's Name",
    dataIndex: "propertyAddress",
    width: 200,
    render: (propertyAddress: any) => (
      <div className="text-center">
        {propertyAddress?.firstName} {propertyAddress?.lastName}
      </div>
    ),
  },
  {
    title: "Applicant's Phone",
    dataIndex: "propertyAddress",
    width: 200,
    render: (propertyAddress: any) => (
      <div className="text-center">{propertyAddress?.phone}</div>
    ),
  },
];
