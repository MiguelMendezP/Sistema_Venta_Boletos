import {Router} from "express";
import { 
    indexViewTerminal,
    createTerminal,
    getTerminales,
    updateTerminal,
    deleteTerminal 
} from "../controllers/crearTerminal.controller";
import storageMulter from "../middlewares/multer.middleware";


const terminalRouter: Router = Router();

terminalRouter.get("/view", indexViewTerminal);
terminalRouter.get("/", getTerminales);
terminalRouter.post("/",storageMulter.single("imagen"), createTerminal);
terminalRouter.post("/update/:idTerminal",storageMulter.single("imagen"), updateTerminal);
terminalRouter.delete("/:idTerminal",deleteTerminal);



export default terminalRouter;
