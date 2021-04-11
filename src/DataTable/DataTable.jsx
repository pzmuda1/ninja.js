import React, { useCallback, useEffect, useMemo, useState } from "react";

import Pagination from "./Pagination";
import Search from "./Search";
import Row from "./Row";

export const DataTable = ({
  rowsPerPage = 5,
  currentPageNumber = null,
  rows = [],
  filterTestFn = null,
  columnsConfig,
  getRowId,
}) => {
  const [tableState, setTableState] = useState({
    rowsPerPage,
    currentPageNumber: currentPageNumber ?? 0,
    searchQuery: "",
  });

  useEffect(() => {
    if (currentPageNumber !== null && rowsPerPage) {
      setTableState({
        ...tableState,
        rowsPerPage,
        currentPageNumber,
      });
    }
  }, [rowsPerPage, currentPageNumber, filterTestFn]);

  const dataToShow = useMemo(() => {
    return rows.filter((row) =>
      filterTestFn ? filterTestFn(row, tableState.searchQuery) : row
    );
  }, [rows, tableState, filterTestFn]);

  const paginatedData = useMemo(() => {
    return dataToShow.slice(
      tableState.currentPageNumber * rowsPerPage,
      (tableState.currentPageNumber + 1) * rowsPerPage
    );
  }, [dataToShow, tableState]);

  const totalPages = useMemo(() => {
    return Math.ceil(dataToShow.length / tableState.rowsPerPage);
  }, [tableState, dataToShow]);

  const setPage = useCallback((currentPageNumber) => {
    setTableState({
      ...tableState,
      currentPageNumber,
    });
  }, []);

  const setSearch = useCallback((searchQuery) => {
    setTableState({
      ...tableState,
      searchQuery,
      currentPageNumber: 0,
    });
  }, []);

  return (
    <div>
      {filterTestFn && <Search onSearch={setSearch} />}
      <table>
        <tbody>
          {paginatedData.map((row, index) => (
            <Row
              columnsConfig={columnsConfig}
              row={row}
              key={getRowId ? getRowId(row) : index}
            ></Row>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPageNumber={tableState.currentPageNumber}
        totalNumberOfPages={totalPages}
        onChange={setPage}
      />
    </div>
  );
};

export default DataTable;
