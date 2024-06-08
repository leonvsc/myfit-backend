import { PerformedExercize } from '@interfaces/performedexercize.interface';

export class WorkoutDTO {
  _id: string;
  totalTime: number;
  exercises: PerformedExercize[];

  constructor(_id: string, totalTime: number, exercises: PerformedExercize[]) {
    this._id = _id;
    this.totalTime = totalTime;
    this.exercises = exercises;
  }
}
