import { AllenamentiModel } from "./allenamenti-model";
import { Types } from "mongoose";

export class AllenamentiService {
  async creaAllenamento(data: {
    data_inizio: Date;
    data_fine: Date;
    id_squadra: Types.ObjectId|string;
  }) {
    const allenamento = new AllenamentiModel(data);
    return await allenamento.save();
  }
  async getAllenamenti() {
    return await AllenamentiModel.find().populate('id_squadra').exec();
  }
  async getAllenamentiTraDate(data_inizio: Date, data_fine: Date) {
    return await AllenamentiModel.find({
      data_inizio: { $gte: data_inizio },
      data_fine: { $lte: data_fine },
    }).populate('id_squadra').exec();
  }
}