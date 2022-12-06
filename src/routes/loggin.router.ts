import {Router} from "express";
import {loginController} from "../controllers/loggin.controller";

const logginRouter: Router = Router();

//Ruta
logginRouter.get("/",loginController.logginView);
logginRouter.post("/",loginController.logginUsuario);
logginRouter.get("/register",loginController.register);
logginRouter.post("/register",loginController.register);

export default logginRouter;
