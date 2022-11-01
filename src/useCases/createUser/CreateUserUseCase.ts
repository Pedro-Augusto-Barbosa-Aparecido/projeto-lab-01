import { hash } from "bcryptjs";
import { Connection } from "../../provider/Connection";

interface UserRequest {
  email: string;
  password: string;
  name: string;
}

export class CreateUserUseCase extends Connection {
  async execute({ email, password, name }: UserRequest) {
    const userAlreadyExist = await this.client.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExist) {
      throw new Error("User already exist!");
    }

    const encryptedPassword = await hash(password, 10);

    const user = await this.client.user.create({
      data: {
        name,
        password: encryptedPassword,
        email,
      },
    });

    return user;
  }
}
