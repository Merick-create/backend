import { NextFunction, Request, Response } from 'express';
import { SquadraService } from './squadra_service';
import mongoose, { Types } from 'mongoose';

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

export const deleteSquad = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'ID mancante' });
    }

    const objectId = new Types.ObjectId(id);

    const eliminata = await squadraService.elimina_squadra({ id: objectId });

    if (!eliminata) {
      res.status(404).json({ error: 'Squadra non trovata' });
    }

    res.status(200).json({ message: 'Squadra eliminata con successo' });

  } catch (error) {
    console.error('Errore in deleteSquad:', error);
    res.status(500).json({ error: 'Errore server' });
  }

};
export const aggiungiAtleta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { squadraId, atletaId } = req.params;

    if (!squadraId || !atletaId || !Types.ObjectId.isValid(squadraId) || !Types.ObjectId.isValid(atletaId)) {
      res.status(400).json({ message: 'Parametri mancanti o ID non validi' });
      return next();
    }

    const squadra = await squadraService.aggiungi_atleta_squadra(squadraId, atletaId);
    res.json(squadra);
    return next();
  } catch (err) {
    if (err instanceof Error) {
      console.error('Errore:', err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error('Errore sconosciuto:', err);
      res.status(500).json({ message: 'Errore sconosciuto' });
    }
    return next(err);
  }
};

export const rimuoviAtleta = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { squadraId, atletaId } = req.params;

    if (!Types.ObjectId.isValid(squadraId) || !Types.ObjectId.isValid(atletaId)) {
      res.status(400).json({ message: 'ID non validi' });
      return next();
    }

    const squadra = await squadraService.rimuovi_atleta_squadra(squadraId, atletaId);
    res.json(squadra);
    return next();
  } catch (err) {
    if (err instanceof Error) {
      console.error('Errore durante la rimozione atleta:', err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error('Errore sconosciuto:', err);
      res.status(500).json({ message: 'Errore sconosciuto' });
    }
    return next(err);
  }
}


