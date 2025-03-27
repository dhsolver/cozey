import { LineItem, Order, PrismaClient, Product } from "@prisma/client";
import { getPrisma } from "../database";

export type FullLineItem = LineItem & {
  products: Array<{
    product: Product;
    quantity: number;
  }>;
};

export type FullOrder = Order & {
  lineItems: Array<FullLineItem>;
};

export class OrderDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }

  async addOrder(order): Promise<Order> {
    const result = await this.prisma.order.create({
      data: {
        ...order,
      },
    });

    return result;
  }

  async findOrder(id: number): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: {
        id,
      },
    });
  }

  async getOrders(): Promise<FullOrder[]> {
    const result = await this.prisma.order.findMany({
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

    return result;
  }

  async removeOrder(id: number): Promise<Order> {
    const result = await this.prisma.order.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default new OrderDao();
