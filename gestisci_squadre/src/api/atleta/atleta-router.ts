import { Router } from "express";
import { get,getlist,add,getByAgeAndRule} from "./atleta-controller";

const router=Router();

router.get('/',getlist);
router.get('/filters',getByAgeAndRule)
router.get('/',get);
router.post('/add',add);

export default router;  