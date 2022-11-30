import { Request, Response } from "express";

class LoginController{
    public login(req:Request,res:Response):void{
        res.render("login/login-view",{
            title: 'Login'
        });
    }

    public register(req:Request,res:Response):void{
        res.render("login/register-view",{
            title: 'Register'
        });
    }
    //Registrarse 
    public registrarse(req: Request, res:Response){
        console.log(req.body);
        res.send("Recivido")
    }
}
export const loginController = new LoginController();