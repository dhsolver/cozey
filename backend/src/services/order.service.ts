import { Order } from "@prisma/client";

import orderDao, { FullOrder } from "../daos/order.dao";

export type PickItem = {
  productName: String;
  quantity: Number;
};

class OrderService {
  async create(resource): Promise<Order> {
    return orderDao.addOrder(resource);
  }

  async findById(id: number): Promise<Order | null> {
    return orderDao.findOrder(id);
  }

  async deleteById(id: number): Promise<Order> {
    return orderDao.removeOrder(id);
  }

  async list(): Promise<Array<FullOrder>> {
    return orderDao.getOrders();
  }

  async pickList(): Promise<Array<PickItem>> {
    const orders = await orderDao.getOrders();
    const productCount: { [key: string]: number } = {};

    orders.forEach((order) => {
      order.lineItems.forEach((lineItem) => {
        lineItem.products.forEach(({ product, quantity }) => {
          productCount[product.name] =
            (productCount[product.name] || 0) + quantity;
        });
      });
    });

    return Object.keys(productCount).map((name) => ({
      productName: name,
      quantity: productCount[name],
    }));
  }
}

export default new OrderService();
