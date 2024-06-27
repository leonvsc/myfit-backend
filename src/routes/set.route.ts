// src/routes/set.routes.ts
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import SetController from '@controllers/set.controller';
import { CreateSetDTO, UpdateSetDTO } from '@dtos/set.dto';
import authenticationMiddleware from '@middlewares/authentication.middleware';

class SetRoutes {
  public router = Router();
  public setController = new SetController();

  constructor() {
    this.router.use(authenticationMiddleware);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get a set by ID
    this.router.get('/sets/:id', this.setController.getSetById);

    // Create a new set
    this.router.post('/sets', validationMiddleware(CreateSetDTO, 'body'), this.setController.createSet);

    // Update an existing set
    this.router.put('/sets/:id', validationMiddleware(UpdateSetDTO, 'body'), this.setController.updateSet);

    // Delete a set
    this.router.delete('/sets/:id', this.setController.deleteSet);
  }
}

export default SetRoutes;
