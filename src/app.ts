import express, { Application } from "express";
import morgan from "morgan";
import path from "path"
import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/index.route";
import crearTerminaloRouter from "./routes/crearTerminal.route";


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
app.use("/", indexRouter);
app.use("/admin/terminal",crearTerminaloRouter);

export default app;
