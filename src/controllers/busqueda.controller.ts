import { Request, Response } from "express";

class BuscarController{

    public buscar(req:Request,res:Response):void{
        res.render("busqueda/busqueda-view",{
            title: 'Buscar'
        });
    }
    //no jala revisar
    public buscando(req: Request, res:Response){
        res.redirect('/busqueda')
    }
}

export const buscarController = new BuscarController();