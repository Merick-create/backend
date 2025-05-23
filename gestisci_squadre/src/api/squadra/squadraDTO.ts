import { IsArray, IsObject, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class SquadraDTO{
    @IsString()
    name:string;
    
    @IsArray()
    @IsString({ each: true })  
    id_atlete:ObjectId[];
}