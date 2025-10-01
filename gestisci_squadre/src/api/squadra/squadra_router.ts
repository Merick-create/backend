import {Router}from 'express';
import { getlist,addSquadra,deleteSquad,aggiungiAtleta,rimuoviAtleta} from './squadra_controller';

const router=Router();

router.get('/squadre',getlist);
router.post('/addsquadra',addSquadra);
router.delete('/delete/:id',deleteSquad);
router.patch('/squadre/:squadraId/aggiungi-atleta/:atletaId', aggiungiAtleta);
router.patch('/squadre/:squadraId/rimuovi-atleta/:atletaId', rimuoviAtleta);

export default router;