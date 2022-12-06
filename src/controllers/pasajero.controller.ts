import { Request, Response } from "express";
import { PasajeroModel } from './../models/pasajero.models';

export async function indexViewPasajero(req: Request, res: Response) {
    return res.render("busqueda/components/pago-components");
}

export async function getPasajero(req: Request, res: Response) {
    const { query: where } = req
    const pasajero = await PasajeroModel.findAll({
        attributes: ["idUsuario","nombre","apellido","telefono"],
        raw: true,
        where
    });
    res.status(200).json(pasajero);
}

export async function createPasajero(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newPasajero = await PasajeroModel.create(body, { raw: true });
        res.status(201).json(newPasajero);
    } catch (error) {
        console.log(error);
    }
}

export async function updatePasajero(req: Request, res: Response) {
    const { nombre } = req.params;
    const { body } = req;
    const entity = await PasajeroModel.findByPk(nombre)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deletePasajero(req: Request, res: Response) {
    const { nombre } = req.params;
    const entity = await PasajeroModel.findByPk(nombre);
    await entity?.destroy();
    res.status(204).json({ok:""});
}