import { Types } from "mongoose"

export type AllenamentiEnity={
    id:Types.ObjectId;
    data_inizio:Date;
    data_fine:Date;
    id_squadra:Types.ObjectId;
}