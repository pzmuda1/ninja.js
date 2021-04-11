import React from "react";

import { render, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

const mockedTotalPages = 5;
const currentPageNumber = 1;
const mockedOnChange = jest.fn();

const renderPagination = () =>
  render(
    <Pagination
      totalNumberOfPages={mockedTotalPages}
      onChange={mockedOnChange}
      currentPageNumber={currentPageNumber}
    />
  );

describe("pagination tests", () => {
  test("render without crash", () => {
    renderPagination();
  });

  test("show provided number of pages", () => {
    const utils = renderPagination();
    return utils.findAllByRole("button").then((matched) => {
      expect(matched.length).toEqual(mockedTotalPages);
    });
  });

  test("trigger proper page change index on click", () => {
    const mockedPageIndexToClick = 3;

    const utils = renderPagination();
    return utils.findAllByRole("button").then((matched) => {
      const pageToClick = matched[mockedPageIndexToClick];
      fireEvent.click(pageToClick);
      expect(mockedOnChange).toBeCalledWith(mockedPageIndexToClick);
    });
  });

  test("show proper button as active page", () => {
    const utils = renderPagination();
    return utils.findAllByRole("button").then((matched) => {
      const activePage = matched[currentPageNumber];

      expect(activePage.classList.contains("button-outline")).toBeTruthy();
    });
  });
});
