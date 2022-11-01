import { Connection } from "../../provider/Connection";

interface IRequest {
  id: string;
  name?: string;
  email?: string;
}

export class UpdateUserUseCase extends Connection {
  async execute({ id, email, name }: IRequest) {
    const userAlreadyExist = await this.client.user.findUnique({
      where: {
        id,
      },
    });

    if (!userAlreadyExist) throw new Error("User not exists");

    this.client.user.update({
      data: {
        name: name || undefined,
        email: email || undefined,
      },

      where: {
        id,
      },
    });

    return {
      message: "User was updated!",
    };
  }
}
