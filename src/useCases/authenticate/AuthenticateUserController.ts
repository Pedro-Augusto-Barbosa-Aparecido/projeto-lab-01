import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}
