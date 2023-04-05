import { Col, notification } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { getValuationData } from "../../../../shared/api/valuation";
import { TopFilterComponent } from "../../../../shared/components/AppLayout/TopFilterComponent";
import { CustomTablePagination } from "../../../../shared/components/CustomTablePagination";
import { useColumns } from "./useColumns";
import { defaultPageConfig, topFilterUtil } from "./utils";

export function Valuations() {
  const isMounted = useRef(false);
  const [pageConfig, setPageConfig] = useState(defaultPageConfig);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ searchOptionType: "Reference Number" });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const columns = useColumns({
    sortField: pageConfig.sortField,
    sortOrder: pageConfig.sortOrder,
  });

  const searchOptions = [
    { value: "referenceNumber", label: "Reference Number" },
    { value: "surveyNumber", label: "Survey Number" },
    { value: "applicantPhone", label: "Applicant's Phone" },
  ];

  function setPageConfigDefault() {
    setPageConfig((v) => ({ ...v, ...defaultPageConfig }));
  }
  const topFilterConfig = useMemo(
    () =>
      topFilterUtil({
        filter,
        setFilter,
        setPageConfigDefault,
        searchOptions,
      }),
    [filter, pageConfig]
  );

  useEffect(() => {
    async function getAllOrders() {
      try {
        setLoading(true);
        // const resp  = await getValuationData(pageConfig, filter);
        const valuationData = await getValuationData(pageConfig, filter);
        if (valuationData.data.status) {
          setData(valuationData.data.valuations);
          setCount(valuationData.data.count || {});

          //   abortControllerRef.current = null;
        } else {
          throw new Error(valuationData.data.message || "Failed to get orders");
        }
      } catch (error: any) {
        if (error.message === "canceled") return;
        setLoading(false);
        notification.error({
          message: "Error",
          description: error.message,
          placement: "topRight",
        });
      } finally {
        setLoading(false);
      }
    }
    getAllOrders();
  }, [pageConfig, filter]);
  return (
    <div className="main">
      <TopFilterComponent {...topFilterConfig} />
      <div className="innerDiv">
        <div style={{ height: "80vh" }}>
          <CustomTablePagination
            columns={columns}
            data={data}
            showSorterTooltip={true}
            {...pageConfig}
            onChangePage={(current: any, pageSize: any) =>
              setPageConfig((v) => ({ ...v, current, pageSize }))
            }
            total={count}
            onChange={() => {}}
            loading={loading}
            emptyTableMessage={
              "Please integrate sales channel or create a manual order!"
            }
            shouldRowSelection={false}
          />
        </div>
      </div>
    </div>
  );
}
