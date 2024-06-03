import { model, Schema, Document } from 'mongoose';
import { Exercise } from '@interfaces/exercise.interface';

export const exerciseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const exerciseModel = model<Exercise & Document>('Exercise', exerciseSchema);

export default exerciseModel;
