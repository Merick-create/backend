import { Types } from "mongoose";

export class AllenamentiDTO{
    id:Types.ObjectId;
    data_inizio:Date;
    data_fine:Date;
    id_squadra:Types.ObjectId;
}