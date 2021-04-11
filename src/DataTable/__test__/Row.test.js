import React from "react";

import { render } from "@testing-library/react";
import Row from "../Row";
import { mockedData } from "../../__mock__/data";

const mockedRow = mockedData[0];

const renderRow = (columnsConfig = []) => {
  return render(
    <table>
      <tbody>
        <Row row={mockedRow} columnsConfig={columnsConfig} />
      </tbody>
    </table>
  );
};

describe("row tests", () => {
  test("render without crash", () => {
    renderRow();
  });

  test("render proper data when accessor provided", () => {
    const utils = renderRow([
      {
        accessor: "name1",
      },
    ]);

    utils.findByText(mockedRow.name1).then((cell) => {
      expect(cell).toBeDefined();
    });
  });

  test("render proper data when renderer provided", () => {
    const testVal = "My awesome text to render";
    const utils = renderRow([
      {
        customRenderer: () => testVal,
      },
    ]);

    utils.findByText(testVal).then((cell) => {
      expect(cell).toBeDefined();
    });
  });
});
