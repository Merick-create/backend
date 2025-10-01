
import { SquadraModel } from "./SquadraModel";
import mongoose, { Types } from "mongoose";
export class SquadraService {

    async getAllSquadre() {
        return SquadraModel.find().populate('id_atlete').exec();
    }

    async createSquadra(data: { name: string; id_atlete: string[] }) {
        const squadra = new SquadraModel({
            name: data.name,
            id_atlete: data.id_atlete.map(id => new Types.ObjectId(id))
        });
        return squadra.save();
    }

    async elimina_squadra(data: { id: Types.ObjectId }) {
        const eliminata = await SquadraModel.findByIdAndDelete(data.id);
        return eliminata;
    }

    async aggiungi_atleta_squadra(squadraId: string, atletaId: string) {
        if (!Types.ObjectId.isValid(squadraId) || !Types.ObjectId.isValid(atletaId)) {
            throw new Error('ID non validi');
        }

        const squadra = await SquadraModel.findById(squadraId);
        if (!squadra) throw new Error('Squadra non trovata');
        const atletaPresente = squadra.id_atlete.some(id => id.toString() === atletaId.toString());
        if (atletaPresente) {
            throw new Error('Atleta già presente nella squadra, impossibile aggiungere.');
        }

        squadra.id_atlete.push(new Types.ObjectId(atletaId));
        await squadra.save();

        return squadra;
    }
    async rimuovi_atleta_squadra(squadraId: string, atletaId: string) {
        if (!mongoose.Types.ObjectId.isValid(squadraId) || !mongoose.Types.ObjectId.isValid(atletaId)) {
            throw new Error('ID non validi');
        }

        const squadra = await SquadraModel.findById(squadraId);
        if (!squadra) throw new Error('Squadra non trovata');

        const atletaPresente = squadra.id_atlete.some(id => id.toString() === atletaId);
        if (!atletaPresente) {
            throw new Error('Atleta non presente nella squadra, impossibile rimuovere.');
        }

        squadra.id_atlete = squadra.id_atlete.filter(id => id.toString() !== atletaId);
        await squadra.save();

        return squadra;
    }
}