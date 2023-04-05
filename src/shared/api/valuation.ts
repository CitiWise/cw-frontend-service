import { apiVms } from ".";
import { cleanObject } from "../utils/helpers";

export function getValuationData(
  { current = 1, pageSize = 10, sortField = "createdAt", sortOrder = "DESC" },
  filter: any
) {
  if (filter?.status?.length === 0) {
    delete filter.status;
  }

  return apiVms.post("/valuation/find", {
    where: cleanObject({ ...filter }, ["", null, undefined]),
    pagination: {
      records: pageSize,
      pageNumber: current,
    },
    sortBy: {
      order: sortField,
      by: sortOrder,
    },
  });
}
