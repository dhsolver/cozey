import { LineItem, PrismaClient } from "@prisma/client";
import { getPrisma } from "../database";

class LineItemDao {
  prisma: PrismaClient;

  constructor() {
    this.prisma = getPrisma();
  }
  
  async addLineItem(lineItem): Promise<LineItem> {
    const result = await this.prisma.lineItem.create({
      data: {
        ...lineItem,
      },
    });

    return result;
  }

  async findLineItem(id: number): Promise<LineItem | null> {
    return this.prisma.lineItem.findFirst({
      where: {
        id,
      },
    });
  }

  async getLineItems(): Promise<LineItem[]> {
    const result = await this.prisma.lineItem.findMany();

    return result;
  }

  async removeLineItem(id: number): Promise<LineItem> {
    const result = await this.prisma.lineItem.delete({
      where: {
        id,
      },
    });

    return result;
  }
}

export default new LineItemDao();
