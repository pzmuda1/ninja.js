import React from "react";

const Row = ({ row, columnsConfig }) => {
  return (
    <tr>
      {columnsConfig?.map((column, index) => {
        return (
          <td key={index}>
            {column.customRenderer
              ? column.customRenderer(row)
              : row[column.accessor]}
          </td>
        );
      })}
    </tr>
  );
};

export default Row;
