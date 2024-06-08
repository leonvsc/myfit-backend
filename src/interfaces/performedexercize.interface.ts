import { Exercise } from '@interfaces/exercise.interface';
import { Set } from '@interfaces/set.interface';

export interface PerformedExercize {
  _id: string;
  exercise: Exercise;
  reps: number;
  weight: number;
  sets: Set[];
  duration: number;
}
