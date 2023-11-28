// Spinner.test.js
import React from "react";
import { render } from "@testing-library/react";
import Spinner from "../components/Spinner";

test("Spinner component snapshot", () => {
  const { asFragment } = render(<Spinner />);
  expect(asFragment()).toMatchSnapshot();
});
