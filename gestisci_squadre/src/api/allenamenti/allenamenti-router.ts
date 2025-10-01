import { Router } from "express";
import { creaAllenamento,getTuttiAllenamenti,getAllenamentiTraDate } from "./allenamenti-controller";

const router=Router();
router.get("/allenamenti",getTuttiAllenamenti);
router.get("/allenamenti/date",getAllenamentiTraDate);
router.post("/allenamento",creaAllenamento);

export default router;