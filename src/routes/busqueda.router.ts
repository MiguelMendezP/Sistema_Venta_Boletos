import {Router} from "express";
import { buscarController } from '../controllers/busqueda.controller';

const buscar: Router = Router();

//Ruta
buscar.get("/",buscarController.buscar);
buscar.post("/",buscarController.buscando);

export default buscar;
