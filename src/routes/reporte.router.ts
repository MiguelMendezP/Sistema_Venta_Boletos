import {Router} from "express";
import { reporteController } from './../controllers/reporte.controller';

const reporte: Router = Router();

//Ruta
reporte.get("/",reporteController.reporte);


export default reporte;
