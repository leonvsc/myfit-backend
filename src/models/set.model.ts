import { model, Schema, Document } from 'mongoose';

export interface Set extends Document {
  reps: number;
  weight: number;
  performedExercize: Schema.Types.ObjectId;
}

export const setSchema: Schema = new Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  performedExercize: { type: Schema.Types.ObjectId, ref: 'PerformedExercize', required: true },
});

const SetModel = model<Set>('Set', setSchema);
export default SetModel;
