import workoutModel from '@models/workout.model';
import { Workout } from '@interfaces/workout.interface';
import { HttpException } from '@exceptions/HttpException';
import { WorkoutDTO } from '@dtos/workout.dto';
import { PerformedExercize } from '@interfaces/performedexercize.interface';
import performedExersizeModel from '@models/performedexercize.model';

class WorkoutService {
  public workouts = workoutModel;
  public performedExercizes = performedExersizeModel;

  public async findAllWorkouts(): Promise<Workout[]> {
    return this.workouts.find();
  }

  public async findWorkoutById(workoutId: string): Promise<Workout> {
    return this.workouts.findById(workoutId).orFail(() => {
      throw new HttpException(404, 'No workout found for this ID');
    });
  }

  public async createWorkout(workoutData: WorkoutDTO): Promise<Workout> {
    try {
      return this.workouts.create(workoutData);
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async deleteWorkout(workoutId: string): Promise<void> {
    try {
      const deleteResult = await this.workouts.deleteOne({ _id: workoutId });
      if (deleteResult.deletedCount === 0) {
        throw new HttpException(404, 'No workout found for this ID');
      }
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async updateWorkout(workoutId: string, workoutData: WorkoutDTO): Promise<Workout> {
    const result = await this.workouts.updateOne({ _id: workoutId }, { $set: workoutData });

    if (result.modifiedCount === 0) {
      throw new HttpException(404, 'Workout not found or no changes made.');
    }

    const updatedWorkout = await this.workouts.findOne({ _id: workoutId });
    if (!updatedWorkout) {
      throw new HttpException(404, 'Workout not found after update.');
    }

    return updatedWorkout as Workout;
  }

  public async linkPerformedExercise(workoutId: string, performedExerciseId: string): Promise<void>{
    const workout: Workout = await this.workouts.findOne({ _id: workoutId });
    const performedExercizeToLink: PerformedExercize = await this.performedExercizes.findOne({ _id: performedExerciseId });
    workout.exercises.push(performedExercizeToLink);
    this.workouts.updateOne({ _id: workoutId }, { $set: workout });
  }
}

export default WorkoutService;
