import React from "react";
import { render } from "@testing-library/react";
import Divider from "../components/Divider";

describe("Divider Component", () => {
  test("renders correctly", () => {
    const { container } = render(<Divider />);
    const dividerElement = container.querySelector(".bg-gray-400");

    expect(dividerElement).toBeInTheDocument();
  });
});
