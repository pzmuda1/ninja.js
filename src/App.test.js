import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("renders without crashing", () => {
  test("", () => {
    render(<App />);
  });
});