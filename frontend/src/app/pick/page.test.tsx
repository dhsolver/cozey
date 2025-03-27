import { render, screen } from "@testing-library/react";
import Pick, { PickItem } from "./page";

describe("Pick Page", () => {
  const originalFetch = global.fetch; // Store the original fetch

  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch; // Restore the original fetch
  });

  it("renders the list of products for the picking team", async () => {
    const mockItems: Array<PickItem> = [
      { productName: "Product 1", quantity: 2 },
      { productName: "Product 2", quantity: 5 },
    ];

    // Mock the fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockItems),
    });

    // Render the component
    render(await Pick());

    // Check if the heading is rendered
    expect(
      screen.getByText("Here's the list of products for the picking team")
    ).toBeInTheDocument();

    // Check if the list items are rendered
    mockItems.forEach((item) => {
      expect(
        screen.getByText(`${item.productName} x ${item.quantity}`)
      ).toBeInTheDocument();
    });

    // Check if the "Back" link is rendered
    const backLink = screen.getByText("Back");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });
});
