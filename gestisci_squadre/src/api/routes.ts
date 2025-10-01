import { Router } from "express";
import AtletaRouter from "./atleta/atleta-router";
import SquadraRouter from "./squadra/squadra_router";
import AllenamentoRouter from './allenamenti/allenamenti-router';

const router=Router();

router.use(AtletaRouter);
router.use(SquadraRouter);
router.use(AllenamentoRouter);  

export default router;