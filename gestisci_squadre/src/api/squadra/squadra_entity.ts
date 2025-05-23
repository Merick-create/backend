import { ObjectId } from "mongoose"

export type SquadraEntity={
    id:ObjectId
    id_atlete: ObjectId[];
    name:String,
}