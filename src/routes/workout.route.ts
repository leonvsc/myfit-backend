// src/routes/workout.routes.ts
import { Router } from 'express';
import WorkoutController from '@controllers/workout.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { WorkoutDTO } from '@dtos/workout.dto';
import authenticationMiddleware from '@middlewares/authentication.middleware';

class WorkoutRoutes {
  public router = Router();
  public workoutController = new WorkoutController();

  constructor() {
    // this.router.use(authenticationMiddleware);
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
