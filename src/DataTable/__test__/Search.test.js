import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Search from "../Search";

describe("search tests", () => {
  test("render without crash", () => {
    render(<Search onSearch={() => {}} />);
  });

  test("Should trigger search on input", () => {
    const mockedOnSearch = jest.fn();
    const mockedSearchVal = "23";

    const utils = render(<Search onSearch={mockedOnSearch} />);
    const input = utils.getByLabelText("search-input");

    fireEvent.change(input, { target: { value: mockedSearchVal } });

    expect(mockedOnSearch).toBeCalledWith(mockedSearchVal);
  });
});
