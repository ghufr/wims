import React, { useMemo, useState } from "react";
import Grid from "react-data-grid";

function getComparator(sortColumn) {
  switch (sortColumn) {
    case "grNo":
    case "grDate":
    case "inboundNo":
    case "updated_at":
      return (a, b) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
      };
    case "reference":
      return (a, b) => {
        return a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
      };
    // case 'id':
    // case 'progress':
    // case 'startTimestamp':
    // case 'endTimestamp':
    // case 'budget':
    //   return (a, b) => {
    //     return a[sortColumn] - b[sortColumn];
    //   };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
}

const DataGrid = ({ columns, rows }) => {
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [sortColumns, setSortColumns] = useState([]);
  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);
  return (
    <Grid
      className="rdg-light"
      columns={columns}
      rowKeyGetter={(row) => row.id}
      rows={sortedRows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
    />
  );
};

export default DataGrid;
