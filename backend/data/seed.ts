import { PrismaClient } from "@prisma/client";
import orders from "./orders.json";
import products from "./products.json";
import lineItems from "./lineItems.json";

const prisma = new PrismaClient();

async function main() {
  for (let product of products) {
    await prisma.product.create({
      data: {
        ...product,
      },
    });
  }

  for (let lineItem of lineItems) {
    await prisma.lineItem.create({
      data: {
        ...lineItem,
        products: {
          connect: lineItem.products.map((id) => ({ id })),
        },
      },
    });
  }

  for (let order of orders) {
    await prisma.order.create({
      data: {
        ...order,
        lineItems: {
          connect: order.lineItems.map((id) => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
