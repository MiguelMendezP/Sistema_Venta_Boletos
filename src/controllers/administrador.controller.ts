import { Request, Response } from "express";
import { AdministradorModel } from './../models/administrador.model';

export async function indexViewAdministrador(req: Request, res: Response) {
    return res.render("administrador/administrador-view");
}

export async function getAdministrador(req: Request, res: Response) {
    const { query: where } = req
    const admin = await AdministradorModel.findAll({
        attributes: ["idAdministrador","nombre","correo", "contrasenia","administrador"],
        raw: true,
        where
    });
    res.status(200).json(admin);
}

export async function createAdministrador(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newAdmin = await AdministradorModel.create(body, { raw: true });
        res.status(201).json(newAdmin);
    } catch (error) {
        console.log(error);
    }
}

export async function updateAdministrador(req: Request, res: Response) {
    const { idAdministrador } = req.params;
    const { body } = req;
    const entity = await AdministradorModel.findByPk(idAdministrador)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deleteAdministrador(req: Request, res: Response) {
    const { idAdministrador } = req.params;
    const entity = await AdministradorModel.findByPk(idAdministrador);
    await entity?.destroy();
    res.status(204).json({ok:""});
}