import {Router} from "express";
import { 
    indexViewUsuario,
    createUsuario,
    getUsuario,
    updateUsuario,
    deleteUsuario 
} from "../controllers/usuario.controller";
import storageMulter from "../middlewares/multer.middleware";


const usuarioRouter: Router = Router();

usuarioRouter.get("/view", indexViewUsuario);
usuarioRouter.get("/", getUsuario);
usuarioRouter.post("/",storageMulter.single("imagen"), createUsuario);
usuarioRouter.post("/update/:idUsuario",storageMulter.single("imagen"), updateUsuario);
usuarioRouter.delete("/:idUsuario",deleteUsuario);



export default usuarioRouter;
