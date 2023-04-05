import { Col, Input, Select } from "antd";
import reactDom from "react-dom";
import debounce from "../../../../shared/utils/debounce";

export const defaultPageConfig = {
  current: 1,
  pageSize: 10,
  sortField: "createdAt",
  sortOrder: "DESC",
};

export const topFilterUtil = ({
  filter,
  setFilter,
  setPageConfigDefault,
  searchOptions,
}: any) => {
  const handleSearchOptionChange = (updatedSearchOptionType: any) => {
    setPageConfigDefault();
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      searchOptionType: updatedSearchOptionType,
      searchValue: "",
    }));
  };

  const debouncedSearchChange = debounce(({ target: { value } }: any) => {
    reactDom.unstable_batchedUpdates(() => {
      setPageConfigDefault();
      setFilter((prevFilter: any) => ({ ...prevFilter, searchValue: value }));
    });
  }, 700);

  return {
    row1: [],
    row1children: [
      <Col>
        <label>Search By:</label>
        <Input.Group compact style={{ marginTop: "6px" }}>
          <Select
            defaultValue={filter.searchOptionType}
            onChange={handleSearchOptionChange}
            style={{ minWidth: "150px" }}
          >
            {searchOptions.map(({ value, label }: any) => (
              <Select.Option value={value}>{label}</Select.Option>
            ))}
          </Select>
          <Input
            style={{ width: "200px" }}
            allowClear
            onChange={debouncedSearchChange}
            placeholder="Search"
          />
        </Input.Group>
      </Col>,
    ],
    row2: [],
  };
};
export const statusToText = {
  WAITING_FOR_PAYMENT: "Waiting for Payment",
  FINDING_VALUER: "Finding Valuer",
  VALUER_ASSIGNED: "Valuer Assigned",
  INSPECTION_SCHEDULED: "Inspection Scheduled",
  INSPECTION_COMPLETED: "Inspection Completed",
  VALUATION_SUBMITTED: "Valuation Submitted",
};
export const statusToColor = {
  WAITING_FOR_PAYMENT: "orange",
  FINDING_VALUER: "gold",
  VALUER_ASSIGNED: "blue",
  INSPECTION_SCHEDULED: "purple",
  INSPECTION_COMPLETED: "cyan",
  VALUATION_SUBMITTED: "green",
};
