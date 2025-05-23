import { Router } from "express";
import AtletaRouter from "./atleta/atleta-router";
import SquadraRouter from "./squadra/squadra_router";

const router=Router();

router.use(AtletaRouter);
router.use(SquadraRouter);

export default router;