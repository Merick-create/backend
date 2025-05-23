import { AtletaEntity } from "./atleta-entity";
import { QueryAtletaDTO,OptionalDTO } from "./atleta-dto";
import { AtleteModule } from "./atleta-module";

export type AtletaQuery=QueryAtletaDTO;

export async function find(query:Partial<AtletaQuery>):Promise<AtletaEntity[]> {
    const q :any={};

    if(query.name){
        q.name = {$regex: query.name, $options: 'i'};
    }
    if(query.lastname)
    {
        q.lastname={$regex: query.lastname, $options: 'i'};
    }
    if(query.rule){
        q.rule={$regex: query.rule, $options: 'i'};
    }
    const atletas=await AtleteModule.find(q);
    return atletas;
}

export async function findByID(id:string):Promise<AtletaEntity|null>{
    return AtleteModule.findById(id);
}

export async function add_Atlete(data:AtletaEntity):Promise<AtletaEntity>{
    const newAtlete=await AtleteModule.create(data);
    return newAtlete; 
}

export const findbyRuleOrAge = async (query: OptionalDTO) => {
  const filter: any = {};

  if (query.age) {
    filter.age = Number(query.age);
  }

  if (query.rule) {
    filter.rule = query.rule;
  }

  
  if (Object.keys(filter).length === 0) {
    return await AtleteModule.find();  
  } else {
    return await AtleteModule.find(filter);
  }
};