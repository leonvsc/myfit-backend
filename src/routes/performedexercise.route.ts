// src/routes/performed-exercize.routes.ts
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import PerformedExerciseController from '@controllers/performedExercise.controller';
import { PerformedExercizeDTO } from '@dtos/performedexercise.dto';
import authenticationMiddleware from '@middlewares/authentication.middleware';

class PerformedExercizeRoutes {
  public router = Router();
  public performedExercizeController = new PerformedExerciseController();

  constructor() {
    this.router.use(authenticationMiddleware);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/performed-exercizes', this.performedExercizeController.getPerformedExercises);
    this.router.get('/performed-exercizes/:id', this.performedExercizeController.getPerformedExerciseById);
    this.router.post(
      '/performed-exercizes',
      validationMiddleware(PerformedExercizeDTO, 'body'),
      this.performedExercizeController.createPerformedExercise,
    );
    this.router.put(
      '/performed-exercizes/:id',
      validationMiddleware(PerformedExercizeDTO, 'body'),
      this.performedExercizeController.updatePerformedExercise,
    );
    this.router.delete('/performed-exercizes/:id', this.performedExercizeController.deletePerformedExercise);
  }
}

export default PerformedExercizeRoutes;
