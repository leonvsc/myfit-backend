// src/routes/exercise.routes.ts
import { Router } from 'express';
import ExerciseController from '@controllers/exercise.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateExerciseDTO, UpdateExerciseDTO } from '@dtos/exercise.dto';

class ExerciseRoutes {
  public router = Router();
  public exerciseController = new ExerciseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/exercises', this.exerciseController.getExercises);
    this.router.get('/exercises/:id', this.exerciseController.getExerciseById);
    this.router.post('/exercises', validationMiddleware(CreateExerciseDTO, 'body'), this.exerciseController.createExercise);
    this.router.put('/exercises/:id', validationMiddleware(UpdateExerciseDTO, 'body'), this.exerciseController.updateExercise);
    this.router.delete('/exercises/:id', this.exerciseController.deleteExercise);
  }
}

export default ExerciseRoutes;
