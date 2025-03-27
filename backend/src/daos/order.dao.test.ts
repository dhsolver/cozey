const mockPrisma = {
  order: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock("../database", () => ({
  getPrisma: jest.fn(() => mockPrisma),
}));

import orderDao from "./order.dao";

describe("OrderDao", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add an order", async () => {
    const mockOrder = { id: 1, name: "Test Order" };
    mockPrisma.order.create.mockResolvedValue(mockOrder);

    const result = await orderDao.addOrder(mockOrder);

    expect(mockPrisma.order.create).toHaveBeenCalledWith({
      data: mockOrder,
    });
    expect(result).toEqual(mockOrder);
  });

  it("should find an order by ID", async () => {
    const mockOrder = { id: 1, name: "Test Order" };
    mockPrisma.order.findFirst.mockResolvedValue(mockOrder);

    const result = await orderDao.findOrder(1);

    expect(mockPrisma.order.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockOrder);
  });

  it("should get all orders with full details", async () => {
    const mockOrders = [
      {
        id: 1,
        lineItems: [
          {
            products: [
              {
                product: { id: 1, name: "Product 1" },
                quantity: 2,
              },
            ],
          },
        ],
      },
    ];
    mockPrisma.order.findMany.mockResolvedValue(mockOrders);

    const result = await orderDao.getOrders();

    expect(mockPrisma.order.findMany).toHaveBeenCalledWith({
      include: {
        lineItems: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    expect(result).toEqual(mockOrders);
  });

  it("should remove an order by ID", async () => {
    const mockOrder = { id: 1, name: "Test Order" };
    mockPrisma.order.delete.mockResolvedValue(mockOrder);

    const result = await orderDao.removeOrder(1);

    expect(mockPrisma.order.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockOrder);
  });
});
