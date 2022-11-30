import { Request, Response } from "express";
import { UsuarioModel } from './../models/usuario.model';

export async function indexViewUsuario(req: Request, res: Response) {
    return res.render("administrador/usuario-view");
}

export async function getUsuario(req: Request, res: Response) {
    const { query: where } = req
    const usuarios = await UsuarioModel.findAll({
        attributes: ["idUsuario","nombre","correo", "contrasenia"],
        raw: true,
        where
    });
    res.status(200).json(usuarios);
}

export async function createUsuario(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newUsuario = await UsuarioModel.create(body, { raw: true });
        res.status(201).json(newUsuario);
    } catch (error) {
        console.log(error);
    }
}

export async function updateUsuario(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const { body } = req;
    const entity = await UsuarioModel.findByPk(idUsuario)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deleteUsuario(req: Request, res: Response) {
    const { idUsuario } = req.params;
    const entity = await UsuarioModel.findByPk(idUsuario);
    await entity?.destroy();
    res.status(204).json({ok:""});
}