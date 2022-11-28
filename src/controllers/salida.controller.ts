import { Request, Response } from "express";
import { SalidaModel } from "../models/salida.model";

export async function indexViewSalida(req: Request, res: Response) {
    return res.render("administrador/salida-view");
}

export async function getSalida(req: Request, res: Response) {
    const { query: where } = req
    const salidas = await SalidaModel.findAll({
        attributes: ["idSalida", "hora", "fecha", "terminal_salida","terminal_destino"],
        raw: true,
        where
    });
    res.status(200).json(salidas);
}

export async function createSalida(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newSalida = await SalidaModel.create(body, { raw: true });
        res.status(201).json(newSalida);
    } catch (error) {
        console.log(error);
    }
}

export async function updateSalida(req: Request, res: Response) {
    const { idSalida } = req.params;
    const { body } = req;
    const entity = await SalidaModel.findByPk(idSalida)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deleteSalida(req: Request, res: Response) {
    const { idSalida } = req.params;
    const entity = await SalidaModel.findByPk(idSalida);
    await entity?.destroy();
    res.status(204).json({ok:""});
}