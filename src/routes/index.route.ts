import {Router} from "express";
import { indexResponse } from "../controllers/index.controller";

const indexRouter: Router = Router();

indexRouter.get("/", indexResponse);

export default indexRouter;
