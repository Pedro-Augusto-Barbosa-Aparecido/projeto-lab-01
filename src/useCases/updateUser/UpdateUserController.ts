import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id, name, email } = request.body;
    const updateUserUseCase = new UpdateUserUseCase();
    const wasUpdated = await updateUserUseCase.execute({
      id,
      name,
      email,
    });

    return response.json(wasUpdated);
  }
}
