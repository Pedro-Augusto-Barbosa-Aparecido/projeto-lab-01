import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor() {}

  async handle(req: Request, res: Response, userUseCase: CreateUserUseCase) {
    const { name, email, password } = req.body;

    const user = await userUseCase.execute({
      name,
      email,
      password,
    });

    return res.json(user);
  }
}
