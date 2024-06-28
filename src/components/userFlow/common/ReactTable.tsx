import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props = {
  defaultData: any;
  columns: any[];
  borderB?: boolean; // New prop to control the border-b class
};

const ReactTable = ({ columns, defaultData, borderB = true }: Props) => {
  // Default value for borderB is true
  const [data, setData] = React.useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full table-auto min-w-full shrink-0">
          <thead className="justify-between bg-[#E7F0FF] ">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any, index: number) => (
                  <th
                    key={header.id}
                    className={`py-2 h-[36px] px-2 text-base font-bold text-[#24222B] text-gilroy-semibold ${
                      index === 0 && "rounded-l-lg"
                    }  ${
                      index === headerGroup.headers.length - 1 && "rounded-r-lg"
                    } overflow-hidden overflow-ellipsis whitespace-nowrap`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row: any) => (
              <tr
                key={row.id}
                className="text-center border-gray-500 text-gilroy-medium"
              >
                {row.getVisibleCells().map((cell: any, index: number) => (
                  <td
                    key={cell.id}
                    className={`relative text-gilroy-medium text-sm md:text-base ${
                      borderB ? "border-b" : "" // Conditionally apply border-b class
                    }`}
                  >
                    <div className="lg:p-3 md:p-3 p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                    {index < row.getVisibleCells().length - 1 && (
                      <div className="border right-0 absolute h-8 top-2 text-gilroy-medium"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup: any) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header: any) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default ReactTable;
