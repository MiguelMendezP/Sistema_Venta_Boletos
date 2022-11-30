import express, { Application } from "express";
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();

// Importing Routes
import LoginRoutes from "./routes/loggin.router";
import BusquedaController from "./routes/busqueda.router";
import indexRouter from "./routes/index.route";
import terminaloRouter from "./routes/terminal.route";
import usuarioRouter from "./routes/usuario.route";
import administradorRouter from "./routes/administrador.router";
import salidaRouter from "./routes/salidas.route";

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

//routes
app.use("/", LoginRoutes);
app.use("/busqueda", BusquedaController);
app.use("/admin", indexRouter);
app.use("/admin/terminal",terminaloRouter);
app.use("/admin/usuario",usuarioRouter)
app.use("/admin/administrador",administradorRouter)
app.use("/admin/salida",salidaRouter);

export default app;
