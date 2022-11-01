import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AuthenticateUserController } from "./useCases/authenticate/AuthenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "./useCases/createUser/CreateUserUseCase";
import { DeleteUserController } from "./useCases/deleteUser/DeleteUserController";
import { SelectUserController } from "./useCases/selectUser/SelectUserController";
import { UpdateUserController } from "./useCases/updateUser/UpdateUserController";

const router = Router();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const selectUserController = new SelectUserController();

const createUserUseCase = new CreateUserUseCase();

const authenticateUserController = new AuthenticateUserController();

router.post("/user", (req: Request, res: Response) =>
  createUserController.handle(req, res, createUserUseCase)
);
router.put("/user", ensureAuthenticated, updateUserController.handle);
router.delete("/user", ensureAuthenticated, deleteUserController.handle);
router.get("/user", ensureAuthenticated, selectUserController.handle);
router.get("/user/:id", ensureAuthenticated, selectUserController.handle);

router.post("/login", authenticateUserController.handle);

export { router };
