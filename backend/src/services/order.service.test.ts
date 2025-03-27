const mockOrderDao = {
  addOrder: jest.fn(),
  findOrder: jest.fn(),
  removeOrder: jest.fn(),
  getOrders: jest.fn(),
};

jest.mock("../daos/order.dao", () => mockOrderDao);

import orderService from "./order.service";

describe("OrderService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an order", async () => {
    const mockOrder = { id: 1, name: "Test Order" };
    mockOrderDao.addOrder.mockResolvedValue(mockOrder);

    const result = await orderService.create(mockOrder);

    expect(mockOrderDao.addOrder).toHaveBeenCalledWith(mockOrder);
    expect(result).toEqual(mockOrder);
  });

  it("should find an order by ID", async () => {
    const mockOrder = { id: 1, name: "Test Order" };
    mockOrderDao.findOrder.mockResolvedValue(mockOrder);

    const result = await orderService.findById(1);

    expect(mockOrderDao.findOrder).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockOrder);
  });

  it("should delete an order by ID", async () => {
    const mockOrder = { id: 1, name: "Test Order" };
    mockOrderDao.removeOrder.mockResolvedValue(mockOrder);

    const result = await orderService.deleteById(1);

    expect(mockOrderDao.removeOrder).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockOrder);
  });

  it("should list all orders", async () => {
    const mockOrders = [
      { id: 1, name: "Order 1" },
      { id: 2, name: "Order 2" },
    ];
    mockOrderDao.getOrders.mockResolvedValue(mockOrders);

    const result = await orderService.list();

    expect(mockOrderDao.getOrders).toHaveBeenCalled();
    expect(result).toEqual(mockOrders);
  });

  it("should generate a pick list", async () => {
    const mockOrders = [
      {
        id: 1,
        lineItems: [
          {
            products: [
              { product: { name: "Product 1" }, quantity: 2 },
              { product: { name: "Product 2" }, quantity: 3 },
            ],
          },
        ],
      },
      {
        id: 2,
        lineItems: [
          {
            products: [
              { product: { name: "Product 1" }, quantity: 1 },
              { product: { name: "Product 3" }, quantity: 4 },
            ],
          },
        ],
      },
    ];
    mockOrderDao.getOrders.mockResolvedValue(mockOrders);

    const result = await orderService.pickList();

    expect(mockOrderDao.getOrders).toHaveBeenCalled();
    expect(result).toEqual([
      { productName: "Product 1", quantity: 3 },
      { productName: "Product 2", quantity: 3 },
      { productName: "Product 3", quantity: 4 },
    ]);
  });
});
