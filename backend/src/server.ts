import express from "express";
import { Server } from "http";

import { getPrisma } from "./database";
import { CommonRoutesConfig } from "./routes/common.routes.config";
import { OrdersRoutes } from "./routes/order.routes.config";

export const start = async (): Promise<Server> =>
  new Promise(async (resolve, reject) => {
    try {
      const port = 4040;
      const app = express();
      const routes: Array<CommonRoutesConfig> = [];

      getPrisma();

      routes.push(new OrdersRoutes(app));

      app.get("/", (req, res) => {
        res.send("Hello World!");
      });

      const server = app.listen(port, () => {
        console.log(`Cozey backend app listening at http://localhost:${port}`);
        resolve(server);
      });
    } catch (err) {
      reject(err);
    }
  });
