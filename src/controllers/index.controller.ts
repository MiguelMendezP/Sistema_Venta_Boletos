import { Request, Response } from "express";

export function indexResponse(req: Request, res: Response) {
  const data = { title: "Programacion web" };
  return res.render("index-view");
}
