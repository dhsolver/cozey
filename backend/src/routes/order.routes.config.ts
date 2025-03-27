import { CommonRoutesConfig } from "./common.routes.config";
import ordersController from "../controllers/order.controller";
import express from "express";

export class OrdersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/orders`)
      .get(ordersController.listOrders)
      .post(ordersController.createOrder);

    this.app.route(`/orders/pick`).get(ordersController.listPickOrders);
    this.app.route(`/orders/pack`).get(ordersController.listOrders);

    this.app
      .route(`/orders/:orderId`)
      .get(ordersController.findOrderById)
      .delete(ordersController.removeOrder);

    return this.app;
  }
}
