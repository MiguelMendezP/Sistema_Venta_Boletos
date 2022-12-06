import {Router} from "express";
import { 
    indexViewPasajero,
    createPasajero,
    getPasajero,
    updatePasajero,
    deletePasajero 
} from "../controllers/pasajero.controller";
import storageMulter from "../middlewares/multer.middleware";


const PasajeroRouter: Router = Router();

PasajeroRouter.get("/view", indexViewPasajero);
PasajeroRouter.get("/", getPasajero);
PasajeroRouter.post("/",storageMulter.single("imagen"), createPasajero);
PasajeroRouter.post("/update/:idPasajero",storageMulter.single("imagen"), updatePasajero);
PasajeroRouter.delete("/:idPasajero",deletePasajero);



export default PasajeroRouter;
