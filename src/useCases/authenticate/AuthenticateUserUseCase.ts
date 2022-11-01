import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Connection } from "../../provider/Connection";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase extends Connection {
  async execute({ email, password }: IRequest) {
    const userAlreadyExist = await this.client.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExist) {
      throw new Error("E-mail or password incorrect!");
    }

    const passwordMatch = await compare(password, userAlreadyExist.password);

    if (!passwordMatch) {
      throw new Error("E-mail or password incorrect!");
    }

    const token = sign({}, process.env.JWT_SECRET!, {
      subject: userAlreadyExist.id,
      expiresIn: 60 * 60 * 3, // 3 hours
    });

    return {
      token,
    };
  }
}
