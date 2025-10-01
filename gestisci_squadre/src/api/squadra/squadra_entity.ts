import { ObjectId, Types } from "mongoose"

export type SquadraEntity={
    id:ObjectId
    id_atlete: Types.ObjectId[];
    name:String,
}