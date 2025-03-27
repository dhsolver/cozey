import { PrismaClient, Product } from "@prisma/client";
import { getPrisma } from "../database";

class ProductDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addProduct(product): Promise<Product> {
    const result = await this.prisma.product.create({
      data: {
        ...product,
      },
    });

    return result;
  }

  async findProduct(id: number): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  async getProducts(): Promise<Product[]> {
    const result = await this.prisma.product.findMany();

    return result;
  }

  async removeProduct(id: number): Promise<Product> {
    const result = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default new ProductDao();
