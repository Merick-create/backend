import { Router } from "express";
import AtletaRouter from "./atleta/atleta-router";
import SquadraRouter from "./squadra/squadra_router";
import AllenamentoRouter from './allenamenti/allenamenti-router';
import { isAuthenticated } from "../lib/auth/auth.middleware";
import authRouter from "./auth/auth.router";

const router=Router();


router.use(isAuthenticated,AtletaRouter);
router.use(isAuthenticated,SquadraRouter);
router.use(isAuthenticated,AllenamentoRouter);  
router.use(authRouter);

export default router;