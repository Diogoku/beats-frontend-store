import React, { useMemo, Fragment } from "react";

// REACT-REDUX
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// REACT-TABLE
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { COLUMNS } from "../table/columns";
import { DefaultColumnFilter } from "../table/ColumnFilters";
import RowExpand from "../table/RowExpand";

// UTILS
import { pageVariants } from "../utils";

// FRAMER-MOTION
import { motion } from "framer-motion";

// MATERIAL-UI
import Button from "@material-ui/core/Button";

// MATERIAL-UI-ICONS
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// CSS
import "../css/paymentsHistoryPage.css";

function PaymentsHistoryPage() {
  const user = useSelector(selectUser);

  const data = useMemo(
    () =>
      user.buyHistory.map((transaction) => ({
        col1: transaction._id,
        col2: transaction.date,
        col3: "card",
        col4: transaction.products.reduce((accumulator, currentProduct) => {
          return (accumulator +=
            currentProduct.price * currentProduct.quantity);
        }, 0),
        col5: transaction.products,
      })),
    [user.buyHistory]
  );

  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable(
    { columns, data, defaultColumn: { Filter: DefaultColumnFilter } },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    prepareRow,
    visibleColumns,
  } = tableInstance;

  const { pageIndex } = state;

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="purhchaseHistoryPage"
    >
      <h1 className="purhchaseHistoryPage__title">Payments History</h1>
      <p>
        <strong>Note: </strong>The table below lists the payments that were made
        by you on this site.
        <br />
        Clicking on the expand row will display information about the products
        &#40;name and quantity&#41; purchased.
      </p>
      <div className="purhchaseHistoryPage__tableWrapper">
        <table {...getTableProps()} className="purhchaseHistoryPage__table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )
                    ) : null}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr className="purhchaseHistoryPage__tableMainRows">
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        <RowExpand row={row} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="purhchaseHistoryPage__tableNavigation">
        <span>
          Page:{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}{" "}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? e.target.value - 1 : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <div className="purhchaseHistoryPage__tableNavigationOptions">
          <Button
            size="small"
            variant="contained"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >{`<<`}</Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >{`>>`}</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default PaymentsHistoryPage;
