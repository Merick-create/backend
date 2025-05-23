import {Router}from 'express';
import { getlist,addSquadra} from './squadra_controller';

const router=Router();

router.get('/squadre',getlist);
router.post('/addsquadra',addSquadra)

export default router;