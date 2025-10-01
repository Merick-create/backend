import { Schema,model } from "mongoose";
import { AtletaEntity } from './atleta-entity';

const AtlteteSchema=new Schema<AtletaEntity>({
    id:{type:String},
    name:{type:String},
    lastname:{type:String},
    age:{type:String},
    rule:{type:String},
    phone_number:{type:String},
    year_subscribe:{type:String}
})

AtlteteSchema.set('toJSON',{
    virtuals:true,
    transform:(_,ret)=>{
        delete ret.__v;
        return ret;
    }
})

export const AtleteModule=model<AtletaEntity>('Atlete',AtlteteSchema);