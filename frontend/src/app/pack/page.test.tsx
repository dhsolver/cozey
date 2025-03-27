import { render, screen } from "@testing-library/react";
import Pack from "./page";

describe("Pack Page", () => {
  const originalFetch = global.fetch; // Store the original fetch

  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch; // Restore the original fetch
  });

  it("renders the list of orders for the packing team", async () => {
    const mockOrders = [
      {
        id: 1,
        date: "2025-03-27T00:00:00.000Z",
        customerName: "John Doe",
        shippingAddress: "123 Main St, Springfield",
        lineItems: [
          {
            id: 1,
            name: "Line Item 1",
            products: [
              { productId: 1, product: { name: "Product 1" }, quantity: 2 },
              { productId: 2, product: { name: "Product 2" }, quantity: 3 },
            ],
          },
        ],
      },
    ];

    // Mock the fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockOrders),
    });

    // Render the component
    render(await Pack());

    // Check if the heading is rendered
    expect(
      screen.getByText("Here's the list of orders for the packing team")
    ).toBeInTheDocument();

    // Check if the order details are rendered
    expect(screen.getByText("Order #1")).toBeInTheDocument();
    expect(screen.getByText("Order Date: 2025-03-26")).toBeInTheDocument();
    expect(screen.getByText("Line Items")).toBeInTheDocument();
    expect(screen.getByText("Line Item 1")).toBeInTheDocument();
    expect(screen.getByText("Product 1 x 2")).toBeInTheDocument();
    expect(screen.getByText("Product 2 x 3")).toBeInTheDocument();
    expect(screen.getByText("Ships to")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, Springfield")).toBeInTheDocument();

    // Check if the "Back" link is rendered
    const backLink = screen.getByText("Back");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/");
  });
});
