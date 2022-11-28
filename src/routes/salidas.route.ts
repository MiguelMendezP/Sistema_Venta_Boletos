import {Router} from "express";
import { 
    indexViewSalida,
    createSalida,
    getSalida,
    updateSalida,
    deleteSalida 
} from "../controllers/salida.controller";
import storageMulter from "../middlewares/multer.middleware";


const salidaRouter: Router = Router();

salidaRouter.get("/view", indexViewSalida);
salidaRouter.get("/", getSalida);
salidaRouter.post("/",storageMulter.single("imagen"), createSalida);
salidaRouter.post("/update/:idSalida",storageMulter.single("imagen"), updateSalida);
salidaRouter.delete("/:idSalida",deleteSalida);



export default salidaRouter;
