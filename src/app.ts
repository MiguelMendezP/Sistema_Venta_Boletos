import express, { Application } from "express";
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();

import {sessionConfig, sessionMiddleware} from "./middlewares/express-session.middleware";


// Importing Routes
import LoginRoutes from "./routes/loggin.router";
import BusquedaController from "./routes/busqueda.router";
import indexRouter from "./routes/index.route";
import terminaloRouter from "./routes/terminal.route";
import usuarioRouter from "./routes/usuario.route";
import administradorRouter from "./routes/administrador.router";
import salidaRouter from "./routes/salidas.route";
import pasajeroRouter from "./routes/pasajero.router";
import boletoRouter from "./routes/boleto.router";
import reporteRouter from "./routes/reporte.router";

// Initializations

const app: Application = express();

//settings
app.set("port", process.env.PORT || 4000);
app.set("view engine","ejs");
app.set('views', path.join(__dirname, './views'));

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./public')))
app.use(sessionConfig);
app.use(sessionMiddleware);

//routes
app.use("/", LoginRoutes);
app.use("/busqueda", BusquedaController);
app.use("/pasajero",pasajeroRouter);
app.use("/mis-boletos",boletoRouter);
app.use("/admin", indexRouter);
app.use("/admin/terminal",terminaloRouter);
app.use("/admin/usuario",usuarioRouter)
app.use("/admin/administrador",administradorRouter)
app.use("/admin/salida",salidaRouter);
app.use("/admin/reporte",reporteRouter)

export default app;
