import { PrismaClient } from "@prisma/client";
import { client } from "../prisma/client";

export class Connection {
  protected client: PrismaClient;

  constructor() {
    this.client = client;
  }
}
