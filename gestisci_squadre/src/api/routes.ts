import { Router } from "express";
import AtletaRouter from "./atleta/atleta-router";

const router=Router();

router.use(AtletaRouter);

export default router;