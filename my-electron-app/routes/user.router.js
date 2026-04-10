import { Router } from "express";
import { login, criarUsuario, listarUsuarios, deletarUsuario, atualizarUsuarios } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post('/login',login)

userRouter.post('/usuarios', criarUsuario);

userRouter.get('/usuarios', listarUsuarios);

userRouter.delete('/usuarios/:id', deletarUsuario);

userRouter.put('/usuarios/:id', atualizarUsuarios);

export default userRouter;