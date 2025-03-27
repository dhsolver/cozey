const mockProductDao = {
  addProduct: jest.fn(),
  findProduct: jest.fn(),
  removeProduct: jest.fn(),
  getProducts: jest.fn(),
};

jest.mock("../daos/product.dao", () => mockProductDao);

import productService from "./product.service";

describe("ProductService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a line item", async () => {
    const mockProduct = { id: 1, name: "Test Line Item" };
    mockProductDao.addProduct.mockResolvedValue(mockProduct);

    const result = await productService.create(mockProduct);

    expect(mockProductDao.addProduct).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it("should find a line item by ID", async () => {
    const mockProduct = { id: 1, name: "Test Line Item" };
    mockProductDao.findProduct.mockResolvedValue(mockProduct);

    const result = await productService.findById(1);

    expect(mockProductDao.findProduct).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  it("should delete a line item by ID", async () => {
    const mockProduct = { id: 1, name: "Test Line Item" };
    mockProductDao.removeProduct.mockResolvedValue(mockProduct);

    const result = await productService.deleteById(1);

    expect(mockProductDao.removeProduct).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  it("should list all line items", async () => {
    const mockProducts = [
      { id: 1, name: "Line Item 1" },
      { id: 2, name: "Line Item 2" },
    ];
    mockProductDao.getProducts.mockResolvedValue(mockProducts);

    const result = await productService.list();

    expect(mockProductDao.getProducts).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });
});
