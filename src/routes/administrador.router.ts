import {Router} from "express";
import { 
    indexViewAdministrador,
    createAdministrador,
    getAdministrador,
    updateAdministrador,
    deleteAdministrador 
} from "../controllers/administrador.controller";
import storageMulter from "../middlewares/multer.middleware";


const administradorRouter: Router = Router();

administradorRouter.get("/view", indexViewAdministrador);
administradorRouter.get("/", getAdministrador);
administradorRouter.post("/",storageMulter.single("imagen"), createAdministrador);
administradorRouter.post("/update/:idAdministrador",storageMulter.single("imagen"), updateAdministrador);
administradorRouter.delete("/:idAdministrador",deleteAdministrador);



export default administradorRouter;
