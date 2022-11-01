import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const deleteUserUseCase = new DeleteUserUseCase();
    const { id } = request.body;

    const wasDeleted = await deleteUserUseCase.execute({ id });

    return response.json(wasDeleted);
  }
}
