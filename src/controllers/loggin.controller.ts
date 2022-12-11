import { Request, Response } from "express";
import { isValidPassword } from "../libraries/bycript.library";
import { UsuarioModel } from "../models/usuario.model";
import { AdministradorModel } from './../models/administrador.model';

class LoginController {
    public logginView(req: Request, res: Response): void {
        res.render("login/login-view", {
            title: 'Login'
        });
    }

    public async logginUsuario(req: Request, res: Response) {
        try {
            const { body } = req;
            const { correo, contrasenia } = body;
            const usuarioResponse = await UsuarioModel.findOne({
                attributes: ["idUsuario", "nombre", "correo", "contrasenia"],
                where: { correo }
            });
            const administradorResponse = await AdministradorModel.findOne({
                attributes: ["idAdministrador", "nombre", "correo", "contrasenia","administrador"],
                where: { correo }
            });
            if (usuarioResponse !== null) {
                const contraseniaUsuario = usuarioResponse.getDataValue("contrasenia");
                
                if (contrasenia == contraseniaUsuario) {
                    const user = usuarioResponse.toJSON();
                    
                    delete user.contrasenia;
                    req.session.user = user;
                    
                    return res.redirect("/busqueda");
                }else{
                    window.alert("La contraseña esta mal");
                }
            }else if (administradorResponse !== null) {
                const contraseniaAdministrador = administradorResponse.getDataValue("contrasenia");
                
                if (contrasenia == contraseniaAdministrador) {
                    const admin = administradorResponse.toJSON();
                    delete admin.contrasenia;
                    req.session.user = admin;
                    return res.redirect("/admin");
                }else{
                    window.alert("La contraseña esta mal");
                }
            }
        } catch (error) {
            res.send("error");
        }
    }

    public register(req: Request, res: Response): void {
        res.render("login/register-view", {
            title: 'Register'
        });
    }
    //Registrarse 
    public registrarse(req: Request, res: Response) {
        res.send("Recivido")
    }
}
export const loginController = new LoginController();