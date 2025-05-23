import { isStringObject } from "util/types";
import{IsString,IsNotEmpty, isNotEmpty} from "class-validator";

export class QueryAtletaDTO{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    lastname:string;
    
    @IsString()
    @IsNotEmpty()
    rule:string;
}

export class AddAtleteDTO{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString()
    lastname:string;

    @IsNotEmpty()
    @IsString()
    age:string;

    @IsNotEmpty()
    @IsString()
    rule:string;
    
    @IsNotEmpty()
    @IsString()
    phone_number:string;

    @IsNotEmpty()
    @IsString()
    year_subscribe:string;
}

export class OptionalDTO{
    age?:number;
    rule?:string;
}