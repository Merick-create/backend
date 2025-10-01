import { Schema,Types,model } from "mongoose";
import { SquadraEntity } from "./squadra_entity";

const SquadraSchema= new Schema<SquadraEntity>({
    name:{type:String},
    id_atlete:[{type:Types.ObjectId,ref:'Atlete',require:true}]
})

SquadraSchema.set('toJSON',{
    virtuals:true,
    transform:(_,ret)=>{
        delete ret.__v;
        return ret;
    }
})

export const SquadraModel=model('Squadre',SquadraSchema);