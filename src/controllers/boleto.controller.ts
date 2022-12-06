import { Request, Response } from "express";
import { BoletoModel } from "../models/boleto.model";

export async function indexViewBoleto(req: Request, res: Response) {
    return res.render("boletos/boleto-view");
}

export async function getBoleto(req: Request, res: Response) {
    const { query: where } = req
    const boleto = await BoletoModel.findAll({
        attributes: ["idBoleto", "idUsuario", "idSalida","noAsiento"],
        raw: true,
        where
    });
    res.status(200).json(boleto);
}

export async function createBoleto(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newBoleto = await BoletoModel.create(body, { raw: true });
        res.status(201).json(newBoleto);
    } catch (error) {
        console.log(error);
    }
}

export async function updateBoleto(req: Request, res: Response) {
    const { idBoleto } = req.params;
    const { body } = req;
    const entity = await BoletoModel.findByPk(idBoleto)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deleteBoleto(req: Request, res: Response) {
    const { idBoleto } = req.params;
    const entity = await BoletoModel.findByPk(idBoleto);
    await entity?.destroy();
    res.status(204).json({ok:""});
}