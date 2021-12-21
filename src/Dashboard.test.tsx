import { render, screen } from "@testing-library/react";
import Dashboard from "pages/dashboard";

test("renders dashboard text", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
