export const params = {
  limit: {
    class: "limit",
    formControlName: "limit",
    inputPlaceholder: "Limit between 0 and 100"
  },
  offset: {
    class: "offset",
    formControlName: "offset",
    inputPlaceholder: "Input Page Number of Data Set"
  },
  sort: {
    class: "sort",
    formControlName: "sort",
    selectPlaceholder: "ASC or DESC",
    values: [
      { name: "Ascending", value: "asc" },
      { name: "Descending", value: "desc" }
    ]
  }
};
