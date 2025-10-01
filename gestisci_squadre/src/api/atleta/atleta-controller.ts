import { Request, Response, NextFunction } from "express";
import AtletaService from "./atleta-service"; // ✅ importa l'istanza del service
import { TypedRequest } from "../../lib/typed-request-interface";
import { QueryAtletaDTO, AddAtleteDTO, OptionalDTO } from "./atleta-dto";
import { AtletaEntity } from "./atleta-entity";

export const getlist = async (
  request: TypedRequest<unknown, QueryAtletaDTO>,
  response: Response,
  next: NextFunction
) => {
  try {
    const listaFiltrata = await AtletaService.find(request.query);
    response.json(listaFiltrata);
  } catch (err) {
    console.error(err);
    response.status(404).json({ error: "Lista non trovata" });
  }
};

export const get = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params["id"];
    const atleta = await AtletaService.findByID(id);

    if (!atleta) {
       response.status(404).json({ error: "Atleta non trovato" });
    }

    response.json(atleta);
  } catch (err) {
    console.error(err);
    response
      .status(500)
      .json({ error: "Errore durante il recupero dell'atleta" });
  }
};

export const add = async (
  request: TypedRequest<AddAtleteDTO>,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, lastname, age, rule, phone_number, year_subscribe } =
      request.body;

    const nuovoAtleta: AtletaEntity = {
      name,
      lastname,
      age,
      rule,
      phone_number,
      year_subscribe,
    };

    const atletaAggiunto = await AtletaService.add_Atlete(nuovoAtleta);

    response.status(201).json(atletaAggiunto);
  } catch (err) {
    console.error(err);
    response
      .status(400)
      .json({ error: "Errore durante l'aggiunta dell'atleta" });
  }
};

export const getByAgeAndRule = async (
  request: TypedRequest<unknown, OptionalDTO>,
  response: Response,
  next: NextFunction
) => {
  try {
    const results = await AtletaService.findByRuleOrAge(request.query);
    response.json(results || []);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Errore nella ricerca" });
  }
};