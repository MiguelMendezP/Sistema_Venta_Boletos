import {Router} from "express";
import {loginController} from "../controllers/loggin.controller";

const logginRouter: Router = Router();

//Ruta
logginRouter.get("/",loginController.login);
logginRouter.get("/register",loginController.register);
logginRouter.post("/register",loginController.register);
//logginRouter.post("/register",loginController.registrarse);

export default logginRouter;
