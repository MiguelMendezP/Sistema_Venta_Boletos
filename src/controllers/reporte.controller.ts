import { Request, Response } from "express";

class ReporteController{

    public reporte(req:Request,res:Response):void{
        res.render("administrador/reporte-view",{
        });
    }
}

export const reporteController = new ReporteController();