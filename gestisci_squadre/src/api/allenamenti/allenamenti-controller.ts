import { Request, Response } from "express";
import { AllenamentiService } from "./allenamenti-service";
import { Types } from "mongoose";

const allenamentiService = new AllenamentiService();
export const creaAllenamento = async (req: Request, res: Response) => {
  try {
    const { data_inizio, data_fine, id_squadra } = req.body;

    if (!data_inizio || !data_fine || !id_squadra) {
       res.status(400).json({ message: "Dati mancanti o invalidi" });
    }

    const dataInizioDate = new Date(data_inizio);
    const dataFineDate = new Date(data_fine);

    if (isNaN(dataInizioDate.getTime()) || isNaN(dataFineDate.getTime())) {
       res.status(400).json({ message: "Date non valide" });
    }

    const idSquadraObjectId = new Types.ObjectId(id_squadra);

    const allenamento = await allenamentiService.creaAllenamento({
      data_inizio: dataInizioDate,
      data_fine: dataFineDate,
      id_squadra: idSquadraObjectId,
    });

     res.status(201).json(allenamento);
  } catch (err) {
    console.error("Errore creazione allenamento:", err);
     res.status(500).json({ message: "Errore creazione allenamento" });
  }
};
export const getTuttiAllenamenti = async (_req: Request, res: Response) => {
  try {
    const allenamenti = await allenamentiService.getAllenamenti();
    res.status(200).json(allenamenti);
  } catch (err) {
    console.error("Errore fetch allenamenti:", err);
    res.status(500).json({ message: "Errore fetch allenamenti" });
  }
};
export const getAllenamentiTraDate = async (req: Request, res: Response) => {
  try {
    const { data_inizio, data_fine } = req.query;

    if (!data_inizio || !data_fine) {
       res.status(400).json({ message: "Date mancanti" });
    }

    const allenamenti = await allenamentiService.getAllenamentiTraDate(
      new Date(data_inizio as string),
      new Date(data_fine as string)
    );

    res.status(200).json(allenamenti);
  } catch (err) {
    console.error("Errore fetch allenamenti tra date:", err);
    res.status(500).json({ message: "Errore fetch allenamenti tra date" });
  }
};