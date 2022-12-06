import {Router} from "express";
import { 
    indexViewBoleto,
    createBoleto,
    getBoleto,
    updateBoleto,
    deleteBoleto 
} from "../controllers/boleto.controller";
import storageMulter from "../middlewares/multer.middleware";


const BoletoRouter: Router = Router();

BoletoRouter.get("/view", indexViewBoleto);
BoletoRouter.get("/", getBoleto);
BoletoRouter.post("/",storageMulter.single("imagen"), createBoleto);
BoletoRouter.post("/update/:idBoleto",storageMulter.single("imagen"), updateBoleto);
BoletoRouter.delete("/:idBoleto",deleteBoleto);



export default BoletoRouter;
