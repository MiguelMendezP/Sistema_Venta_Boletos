import { Request, Response, NextFunction } from "express";
import session from "express-session";

import UsuarioType from "../types/usuario.types";

declare module "express-session" {
  interface SessionData {
    user: UsuarioType;
  }
}

export const sessionConfig = session({
  name: "session-cookie",
  secret: "secreto",
  resave: false,
  saveUninitialized: false,
});

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction)=> {
  const {user} =  req.session;
  console.log(user);
  res.locals.user = user;
  next();
}