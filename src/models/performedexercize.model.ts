import { model, Schema, Document } from 'mongoose';
import { PerformedExercize } from '@interfaces/performedexercize.interface';
import { exerciseSchema } from '@models/exercise.model';
import { setSchema } from '@models/set.model';

const performedExersizeSchema: Schema = new Schema({
  exercise: {
    type: exerciseSchema,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  sets: [
    {
      type: setSchema,
      required: true,
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
});

const performedExersizeModel = model<PerformedExercize & Document>('PerformedExersize', performedExersizeSchema);

export default performedExersizeModel;
export { performedExersizeSchema }; // Export the schema to be used in Workout model
