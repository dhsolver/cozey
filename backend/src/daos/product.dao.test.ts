const mockPrisma = {
  product: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock("../database", () => ({
  getPrisma: jest.fn(() => mockPrisma),
}));

import productDao from "./product.dao";

describe("ProductDao", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a product", async () => {
    const mockProduct = { id: 1, name: "Test Product" };
    mockPrisma.product.create.mockResolvedValue(mockProduct);

    const result = await productDao.addProduct(mockProduct);

    expect(mockPrisma.product.create).toHaveBeenCalledWith({
      data: mockProduct,
    });
    expect(result).toEqual(mockProduct);
  });

  it("should find a product by ID", async () => {
    const mockProduct = { id: 1, name: "Test Product" };
    mockPrisma.product.findFirst.mockResolvedValue(mockProduct);

    const result = await productDao.findProduct(1);

    expect(mockPrisma.product.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockProduct);
  });

  it("should get all products", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    mockPrisma.product.findMany.mockResolvedValue(mockProducts);

    const result = await productDao.getProducts();

    expect(mockPrisma.product.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it("should remove a product by ID", async () => {
    const mockProduct = { id: 1, name: "Test Product" };
    mockPrisma.product.delete.mockResolvedValue(mockProduct);

    const result = await productDao.removeProduct(1);

    expect(mockPrisma.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockProduct);
  });
});
