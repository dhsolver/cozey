import { Order } from "@prisma/client";

import orderDao from "../daos/order.dao";

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

  async list(): Promise<Array<Order>> {
    return orderDao.getOrders();
  }
};

export default new OrderService();
