import { Connection } from "../../provider/Connection";

interface IRequest {
  id?: string;
  name?: string;
  email?: string;
}

export class SelectUserUseCase extends Connection {
  async execute({ id, name, email }: IRequest) {
    if (id) {
      const user = await this.client.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error("User not found!");
      }

      return user;
    }

    const users = await this.client.user.findMany({
      where: {
        email: email || undefined,
        name: {
          contains: name || "",
        },
      },
    });

    return users;
  }
}
