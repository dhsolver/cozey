import { LineItem } from "@prisma/client";

import lineItemDao from "../daos/lineItem.dao";

class LineItemService {
  async create(resource): Promise<LineItem> {
    return lineItemDao.addLineItem(resource);
  }

  async findById(id: number): Promise<LineItem | null> {
    return lineItemDao.findLineItem(id);
  }

  async deleteById(id: number): Promise<LineItem> {
    return lineItemDao.removeLineItem(id);
  }

  async list(): Promise<Array<LineItem>> {
    return lineItemDao.getLineItems();
  }
};

export default new LineItemService();
