import { Workout } from '@interfaces/workout.interface';

export interface User {
  _id: string;
  email: string;
  password: string;
  workouts: Workout[];
}
