import { Exercise } from '@interfaces/exercise.interface';
import { Set } from '@interfaces/set.interface';

export class PerformedExercizeDTO {
  _id: string;
  exercise: Exercise;
  reps: number;
  weight: number;
  sets: Set[];
  duration: number;

  constructor(_id: string, exercise: Exercise, reps: number, weight: number, sets: Set[], duration: number) {
    this._id = _id;
    this.exercise = exercise;
    this.reps = reps;
    this.weight = weight;
    this.sets = sets;
    this.duration = duration;
  }
}
