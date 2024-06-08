// src/routes/performed-exercize.routes.ts
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import PerformedExercizeController from '@controllers/performedExercise.controller';
import { PerformedExercizeDTO } from '@dtos/performedexercise.dto';

class PerformedExercizeRoutes {
  public router = Router();
  public performedExercizeController = new PerformedExercizeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/performed-exercizes', this.performedExercizeController.getPerformedExercizes);
    this.router.get('/performed-exercizes/:id', this.performedExercizeController.getPerformedExercizeById);
    this.router.post(
      '/performed-exercizes',
      validationMiddleware(PerformedExercizeDTO, 'body'),
      this.performedExercizeController.createPerformedExercize,
    );
    this.router.put(
      '/performed-exercizes/:id',
      validationMiddleware(PerformedExercizeDTO, 'body'),
      this.performedExercizeController.updatePerformedExercize,
    );
    this.router.delete('/performed-exercizes/:id', this.performedExercizeController.deletePerformedExercize);
  }
}

export default PerformedExercizeRoutes;
