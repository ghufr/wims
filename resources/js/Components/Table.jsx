import React from "react";

import { Link } from "@inertiajs/inertia-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Checkbox from "./Checkbox";
// import ButtonIcon from "./ButtonIcon";

const Table = ({
  columns = [],
  data = [],
  selectableRows = false,
  selectedRows = [],
  onSelectedRowsChange,
  onSelectAll,
  rowEdit,
  rowDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="bg-white rounded-lg text-left table-auto w-full">
        <thead className="font-medium text-gray-700 border-b">
          <tr>
            {selectableRows && (
              <th className="p-1 text-center">
                <Checkbox
                  onChange={(e) => {
                    onSelectAll(e.target.checked);
                  }}
                />
              </th>
            )}
            {columns.map((column, i) => (
              <th
                key={i}
                className="p-1 max-w-[100px] text-ellipsis whitespace-nowrap"
              >
                {column.name}
              </th>
            ))}
            {(rowEdit || rowDelete) && <th></th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, i) => (
            <tr key={i} className="transition-colors hover:bg-gray-100">
              {selectableRows && (
                <td className=" p-1 text-center">
                  <Checkbox
                    name={i}
                    id={"check-" + i}
                    value={row.id}
                    checked={selectedRows.indexOf(row.id) > -1}
                    onChange={() => onSelectedRowsChange(row)}
                  />
                </td>
              )}
              {columns.map((column, i) => {
                const { selector, format } = column;
                const value = row[selector];
                const formattedValue = format ? format(value) : value;

                if (i === 0 && rowEdit) {
                  return (
                    <td className="p-1" key={i}>
                      <Link
                        href={rowEdit(row)}
                        className="underline font-medium text-blue-500"
                      >
                        {formattedValue}
                      </Link>
                    </td>
                  );
                }
                return (
                  <td className="p-1" key={i}>
                    {formattedValue}
                  </td>
                );
              })}

              {(rowEdit || rowDelete) && (
                <td className="p-1 space-x-2 hidden md:flex">
                  {rowEdit && (
                    <Link href={rowEdit(row)}>
                      <ButtonIcon>
                        <HiPencil />
                      </ButtonIcon>
                    </Link>
                  )}
                  {rowDelete && (
                    <ButtonIcon onClick={() => rowDelete(row)}>
                      <HiTrash />
                    </ButtonIcon>
                  )}
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 2} className="p-4 text-center">
                <p className="font-medium">No Record</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
