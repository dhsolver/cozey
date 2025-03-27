import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Component", () => {
  it("renders the Picking Team link", () => {
    render(<Home />);
    const pickingLink = screen.getByText("Picking Team");
    expect(pickingLink).toBeInTheDocument();
    expect(pickingLink).toHaveAttribute("href", "/pick");
  });

  it("renders the Packing Team link", () => {
    render(<Home />);
    const packingLink = screen.getByText("Packing Team");
    expect(packingLink).toBeInTheDocument();
    expect(packingLink).toHaveAttribute("href", "/pack");
  });
});
