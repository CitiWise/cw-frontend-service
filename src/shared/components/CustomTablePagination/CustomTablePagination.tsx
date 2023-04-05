import { Pagination, Table } from "antd";
import styles from "./index.module.scss";

export function CustomTablePagination({
  columns,
  data,
  current = 1,
  total = 0,
  pageSize = 10,
  onChangePage = (current: any, pageSize: any) => {},
  selectedItem = undefined,
  catalog = undefined,
  selectedRowKeys,
  setSelectedRowKeys,
  setSelectedItem = undefined,
  emptyTableMessage = "Nothing to do here",
  shouldRowSelection = true,
  showPagination = true,
  ...tableProps
}: any) {
  return (
    <div className={styles.main}>
      {data?.length || tableProps.loading ? (
        <>
          <Table
            // tableLayout={`${catalog ? "auto" : "fixed"}`}
            rowSelection={
              shouldRowSelection
                ? {
                    type: "checkbox",
                    selectedRowKeys,
                    preserveSelectedRowKeys: true,
                    onChange:
                      setSelectedRowKeys ||
                      ((_, selectedRow) =>
                        setSelectedItem ? setSelectedItem(selectedRow) : null),
                  }
                : null
            }
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey={(record) => record.id}
            className={styles.table}
            scroll={{ y: "calc(100% - 3.5rem)", x: "calc(100% - 3.5rem)" }}
            {...tableProps}
          />
          {showPagination && (
            <Pagination
              current={current}
              total={total}
              pageSize={pageSize}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              className={styles.pagination}
              onChange={onChangePage}
              showSizeChanger
            />
          )}
        </>
      ) : (
        <div className="noDataDefaultComponent">{emptyTableMessage}</div>
      )}
    </div>
  );
}
