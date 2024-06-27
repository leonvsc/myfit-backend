import { model, Schema, Document } from 'mongoose';
import { Workout } from '@interfaces/workout.interface';
import { performedExersizeSchema } from '@models/performedexercize.model';

export const workoutSchema: Schema = new Schema({
  totalTime: {
    type: Number,
    required: true,
  },
  exercises: [
    {
      type: performedExersizeSchema,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const workoutModel = model<Workout & Document>('Workout', workoutSchema);

export default workoutModel;
