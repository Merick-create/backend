import { Schema,Types,Mongoose, model } from "mongoose";
import { AllenamentiEnity } from "./allenamenti-entity";

const AllenamentiSchema=new Schema<AllenamentiEnity>({
    data_inizio:{type:Date,required:true},
    data_fine:{type:Date,required:true},
    id_squadra:[{type:Types.ObjectId,ref:'squadres',require:true}]
});
AllenamentiSchema.set('toJSON',{
    virtuals:true,
    transform:(_,ret)=>{
        delete ret._id;           
        delete ret.__v;
        return ret;
    }
});

export const AllenamentiModel=model('allenamenti',AllenamentiSchema);