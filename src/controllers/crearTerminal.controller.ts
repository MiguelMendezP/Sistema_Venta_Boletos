import { Request, Response } from "express";
import { TermianlModel } from "../models/terminal.models";

export async function indexViewTerminal(req: Request, res: Response) {
    return res.render("administrador/terminal-view");
}

export async function getTerminales(req: Request, res: Response) {
    const { query: where } = req
    const terminales = await TermianlModel.findAll({
        attributes: ["idTerminal", "nombre", "ciudad", "estado"],
        raw: true,
        where
    });
    res.status(200).json(terminales);
}

export async function createTerminal(req: Request, res: Response) {
    try {
        const { body } = req;
        console.log(body);
        const newTerminal = await TermianlModel.create(body, { raw: true });
        res.status(201).json(newTerminal);
    } catch (error) {
        console.log(error);
    }
}

export async function updateTerminal(req: Request, res: Response) {
    const { idTerminal } = req.params;
    const { body } = req;
    const entity = await TermianlModel.findByPk(idTerminal)
    await entity?.update(body);
    res.status(201).json(entity?.toJSON());
}

export async function deleteTerminal(req: Request, res: Response) {
    const { idTerminal } = req.params;
    const entity = await TermianlModel.findByPk(idTerminal);
    await entity?.destroy();
    res.status(204).json({ok:""});
}