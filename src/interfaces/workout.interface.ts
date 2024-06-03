import { PerformedExercize } from '@interfaces/performedexercize.interface';

export interface Workout {
  _id: string;
  totalTime: number;
  exercises: PerformedExercize[];
}
