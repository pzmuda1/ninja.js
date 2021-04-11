import React from "react";

import { fireEvent, render } from "@testing-library/react";
import DataTable from "../DataTable";
import { mockedData } from "../../__mock__/data";

const filterFn = (row, searchText) => {
  return (
    row.name1.toLowerCase().search(searchText.toLowerCase()) > -1 ||
    (row.email && row.email.toLowerCase().search(searchText.toLowerCase()) > -1)
  );
};

const columnsConfig = [
  {
    accessor: "name1",
  },
];

const rowsPerPage = 5;

const mockedInitialPage = 1;

const renderDataTable = () => {
  return render(
    <DataTable
      rows={mockedData}
      rowsPerPage={rowsPerPage}
      filterTestFn={filterFn}
      columnsConfig={columnsConfig}
      getRowId={(row) => row.per_id}
      currentPageNumber={mockedInitialPage}
    />
  );
};

describe("search tests", () => {
  test("render without crash", () => {
    renderDataTable();
  });

  test("should show proper number of pages", () => {
    const utils = renderDataTable();
    return utils.findAllByRole("button").then((matched) => {
      expect(matched.length).toEqual(
        Math.ceil(mockedData.length / rowsPerPage)
      );
    });
  });

  test("should show proper number of pages", () => {
    const utils = renderDataTable();
    return utils.findAllByRole("button").then((matched) => {
      expect(matched.length).toEqual(
        Math.ceil(mockedData.length / rowsPerPage)
      );
    });
  });

  test("should show active page when set by prop", () => {
    const utils = renderDataTable();
    return utils.findAllByRole("button").then((matched) => {
      const activePage = matched[mockedInitialPage];
      expect(activePage.classList.contains("button-outline"));
    });
  });

  test("should paginate rows properly", () => {
    const utils = renderDataTable();
    return utils
      .findByText(mockedData[mockedInitialPage * rowsPerPage].name1)
      .then((match) => {
        expect(match).toBeDefined();
      });
  });

  test("should show proper rows count", () => {
    const utils = renderDataTable();
    expect(utils.baseElement.getElementsByTagName("tr").length).toEqual(
      rowsPerPage
    );
  });

  test("should filter pages properly", () => {
    const utils = renderDataTable();
    const input = utils.getByLabelText("search-input");
    fireEvent.change(input, { target: { value: mockedData[0].name1 } });

    expect(utils.baseElement.getElementsByTagName("tr").length).toEqual(1);
  });
});
