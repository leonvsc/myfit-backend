// src/routes/workout.routes.ts
import { Router } from 'express';
import WorkoutController from '@controllers/workout.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { WorkoutDTO } from '@dtos/workout.dto';

class WorkoutRoutes {
  public router = Router();
  public workoutController = new WorkoutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/workouts', this.workoutController.getWorkouts);
    this.router.get('/workouts/:id', this.workoutController.getWorkoutById);
    this.router.post('/workouts', validationMiddleware(WorkoutDTO, 'body'), this.workoutController.createWorkout);
    this.router.put('/workouts/:id', validationMiddleware(WorkoutDTO, 'body'), this.workoutController.updateWorkout);
    this.router.delete('/workouts/:id', this.workoutController.deleteWorkout);
    this.router.post('/workouts/:workoutId/link/:performedExerciseId', this.workoutController.linkPerformedExerciseToWorkout);
  }
}

export default WorkoutRoutes;
