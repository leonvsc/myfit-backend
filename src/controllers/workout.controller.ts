import { NextFunction, Request, Response } from 'express';
import { Workout } from '@interfaces/workout.interface';
import WorkoutService from '@services/workout.service';
import { WorkoutDTO } from '@dtos/workout.dto';

class WorkoutController {
  public workoutService = new WorkoutService();

  public getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllWorkoutsData: Workout[] = await this.workoutService.findAllWorkouts();
      res.status(200).json({ data: findAllWorkoutsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workoutId: string = req.params.id;
      const findOneWorkoutData: Workout = await this.workoutService.findWorkoutById(workoutId);
      res.status(200).json({ data: findOneWorkoutData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workoutData: WorkoutDTO = req.body;
      const createWorkoutData: Workout = await this.workoutService.createWorkout(workoutData);
      res.status(201).json({ data: createWorkoutData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workoutId: string = req.params.id;
      const workoutData: WorkoutDTO = req.body;
      const updateWorkoutData: Workout = await this.workoutService.updateWorkout(workoutId, workoutData);
      res.status(200).json({ data: updateWorkoutData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workoutId: string = req.params.id;
      await this.workoutService.deleteWorkout(workoutId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default WorkoutController;
