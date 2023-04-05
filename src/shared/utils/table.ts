export function isSortField(sortField: any, sortOrder: any, type: any) {
  if (sortField === type) {
    if (sortOrder === "DESC") {
      return "descend";
    } else {
      return "ascend";
    }
  } else {
    return null;
  }
}

export function tableSorter(currentValue: any, previouseValue: any) {
  return previouseValue > currentValue ? 1 : -1;
}
