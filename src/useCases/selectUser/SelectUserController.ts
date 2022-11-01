import { CommonFunctions } from "./../../utils/CommonFunctions";
import { Request, Response } from "express";
import { SelectUserUseCase } from "./SelectUserUseCase";

export class SelectUserController {
  async handle(request: Request, response: Response) {
    const { name, email } = request.body;
    const { id } = request.params;
    const { page, limit } = request.query;

    const selectUserUseCase = new SelectUserUseCase();
    const commonFunctions = new CommonFunctions();

    const users = await selectUserUseCase.execute({
      id,
      name,
      email,
    });

    return response.json(
      id
        ? users
        : commonFunctions.paginate({
            objectList: users,
            page: parseInt(page as string),
            limit: parseInt(limit ? (limit as string) : "10"),
          })
    );
  }
}
