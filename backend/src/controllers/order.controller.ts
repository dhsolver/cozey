import express from "express";
import orderService from "../services/order.service";

class OrdersController {
  async listOrders(req: express.Request, res: express.Response) {
    const orders = await orderService.list();
    res.status(200).send(orders);
  }

  async listPickOrders(req: express.Request, res: express.Response) {
    const orders = await orderService.pickList();
    res.status(200).send(orders);
  }

  async findOrderById(req: express.Request, res: express.Response) {
    const order = await orderService.findById(req.body.id);
    res.status(200).send(order);
  }

  async createOrder(req: express.Request, res: express.Response) {
    const orderId = await orderService.create(req.body);
    res.status(201).send({ id: orderId });
  }

  async removeOrder(req: express.Request, res: express.Response) {
    await orderService.deleteById(req.body.id);
    res.status(204).send();
  }
}

export default new OrdersController();
