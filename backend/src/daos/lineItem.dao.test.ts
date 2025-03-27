const mockPrisma = {
  lineItem: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock("../database", () => ({
  getPrisma: jest.fn(() => mockPrisma),
}));

import lineItemDao from "./lineItem.dao";

describe("LineItemDao", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a line item", async () => {
    const mockLineItem = { id: 1, name: "Test Line Item" };
    mockPrisma.lineItem.create.mockResolvedValue(mockLineItem);

    const result = await lineItemDao.addLineItem(mockLineItem);

    expect(mockPrisma.lineItem.create).toHaveBeenCalledWith({
      data: mockLineItem,
    });
    expect(result).toEqual(mockLineItem);
  });

  it("should find a line item by ID", async () => {
    const mockLineItem = { id: 1, name: "Test Line Item" };
    mockPrisma.lineItem.findFirst.mockResolvedValue(mockLineItem);

    const result = await lineItemDao.findLineItem(1);

    expect(mockPrisma.lineItem.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockLineItem);
  });

  it("should get all line items", async () => {
    const mockLineItems = [
      { id: 1, name: "Line Item 1" },
      { id: 2, name: "Line Item 2" },
    ];
    mockPrisma.lineItem.findMany.mockResolvedValue(mockLineItems);

    const result = await lineItemDao.getLineItems();

    expect(mockPrisma.lineItem.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockLineItems);
  });

  it("should remove a line item by ID", async () => {
    const mockLineItem = { id: 1, name: "Test Line Item" };
    mockPrisma.lineItem.delete.mockResolvedValue(mockLineItem);

    const result = await lineItemDao.removeLineItem(1);

    expect(mockPrisma.lineItem.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockLineItem);
  });
});
