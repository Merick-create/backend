import { Request, Response } from 'express';
import { SquadraService } from './squadra_service';

const squadraService = new SquadraService();

  export const getlist = async (req: Request, res: Response) => {
  try {
    const squadre = await squadraService.getAllSquadre();
    res.status(200).json(squadre);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero delle squadre', error });
  }
}

export const addSquadra = async (req: Request, res: Response) => {
  try {
    const { name, id_atlete } = req.body;
    const nuovaSquadra = await squadraService.createSquadra({ name, id_atlete });
    res.status(201).json(nuovaSquadra);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella creazione della squadra', error });
  }
}