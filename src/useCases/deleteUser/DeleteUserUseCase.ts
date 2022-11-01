import { Connection } from "../../provider/Connection";

interface IRequest {
  id: string;
}

export class DeleteUserUseCase extends Connection {
  async execute({ id }: IRequest) {
    const userAlreadyExist = await this.client.user.findUnique({
      where: {
        id,
      },
    });

    if (!userAlreadyExist) throw new Error("User not found!");

    await this.client.user.delete({
      where: {
        id,
      },
    });

    return {
      message: "User was deleted!",
    };
  }
}
