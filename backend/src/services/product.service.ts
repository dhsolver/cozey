import { Product } from "@prisma/client";

import productDao from "../daos/product.dao";

class ProductService {
  async create(resource): Promise<Product> {
    return productDao.addProduct(resource);
  }

  async findById(id: number): Promise<Product | null> {
    return productDao.findProduct(id);
  }

  async deleteById(id: number): Promise<Product> {
    return productDao.removeProduct(id);
  }

  async list(): Promise<Array<Product>> {
    return productDao.getProducts();
  }
};

export default new ProductService();
