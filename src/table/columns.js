import React from "react";

// TABLE COLUMN FILTERS
import { DefaultColumnFilter, NumberRangeColumnFilter } from "./ColumnFilters";

// MATERIAL-UI-ICONS
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export const COLUMNS = [
  {
    Header: () => null,
    id: "expander", // 'id' is required
    Cell: ({ row }) => (
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
      </span>
    ),
  },
  {
    Header: "Payment_id",
    accessor: "col1", // accessor is the "key" in the data
    disableFilters: true, //This makes the column not filterable
  },
  {
    Header: "Date",
    accessor: "col2",
    disableFilters: true,
  },
  {
    Header: "Loader",
    accessor: "col3",
    Filter: DefaultColumnFilter,
  },
  {
    Header: "Amount",
    accessor: "col4",
    Filter: NumberRangeColumnFilter,
    filter: "between",
  },
];
