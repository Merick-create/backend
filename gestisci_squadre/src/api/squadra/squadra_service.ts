import { SquadraModel } from "./SquadraModel";
import {Types} from "mongoose";
export class SquadraService{
    async getAllSquadre(){
        return SquadraModel.find().populate('id_atlete').exec();
    }

    async createSquadra(data:{name:string;id_atlete:string[]}){
        const squadra=new SquadraModel({
            name:data.name,
            id_atlete:data.id_atlete.map(id=>new Types.ObjectId(id))
        });
        return squadra.save();
    }
}