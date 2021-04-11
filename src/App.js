import React, { useCallback, useMemo } from "react";
import "./App.css";

import DataTable from "./DataTable";
import { mockedData } from "./__mock__/data";

export const App = () => {
  const columnsConfig = useMemo(() => [
    {
      customRenderer: (row) => (
        <>
          <a href={row.edit_path}>{row.name1}</a>
          <br />
          <small>{row.email}</small>
        </>
      ),
    },
  ]);

  const filterFn = useCallback((row, searchText) => {
    return (
      row.name1.toLowerCase().search(searchText.toLowerCase()) > -1 ||
      (row.email &&
        row.email.toLowerCase().search(searchText.toLowerCase()) > -1)
    );
  }, []);

  return (
    <div className="container mt-3">
      <DataTable
        rows={mockedData}
        rowsPerPage={5}
        filterTestFn={filterFn}
        columnsConfig={columnsConfig}
        getRowId={(row) => row.per_id}
      />
    </div>
  );
};

export default App;
