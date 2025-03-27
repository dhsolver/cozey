const mockLineItemDao = {
  addLineItem: jest.fn(),
  findLineItem: jest.fn(),
  removeLineItem: jest.fn(),
  getLineItems: jest.fn(),
};

jest.mock("../daos/lineItem.dao", () => mockLineItemDao);

import lineItemService from "./lineItem.service";

describe("LineItemService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a line item", async () => {
    const mockLineItem = { id: 1, name: "Test Line Item" };
    mockLineItemDao.addLineItem.mockResolvedValue(mockLineItem);

    const result = await lineItemService.create(mockLineItem);

    expect(mockLineItemDao.addLineItem).toHaveBeenCalledWith(mockLineItem);
    expect(result).toEqual(mockLineItem);
  });

  it("should find a line item by ID", async () => {
    const mockLineItem = { id: 1, name: "Test Line Item" };
    mockLineItemDao.findLineItem.mockResolvedValue(mockLineItem);

    const result = await lineItemService.findById(1);

    expect(mockLineItemDao.findLineItem).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockLineItem);
  });

  it("should delete a line item by ID", async () => {
    const mockLineItem = { id: 1, name: "Test Line Item" };
    mockLineItemDao.removeLineItem.mockResolvedValue(mockLineItem);

    const result = await lineItemService.deleteById(1);

    expect(mockLineItemDao.removeLineItem).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockLineItem);
  });

  it("should list all line items", async () => {
    const mockLineItems = [
      { id: 1, name: "Line Item 1" },
      { id: 2, name: "Line Item 2" },
    ];
    mockLineItemDao.getLineItems.mockResolvedValue(mockLineItems);

    const result = await lineItemService.list();

    expect(mockLineItemDao.getLineItems).toHaveBeenCalled();
    expect(result).toEqual(mockLineItems);
  });
});
