import { NextFunction, Request, Response } from 'express';
import { PerformedExercize } from '@interfaces/performedexercize.interface';
import PerformedExerciseService from '@services/performedExercise.service';
import { PerformedExercizeDTO } from '@dtos/performedexercise.dto';

class PerformedExerciseController {
  public performedExerciseService = new PerformedExerciseService();

  public getPerformedExercises = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPerformedExercizesData: PerformedExercize[] = await this.performedExerciseService.findAllPerformedExercises();
      res.status(200).json({ data: findAllPerformedExercizesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPerformedExerciseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExerciseId: string = req.params.id;
      const findOnePerformedExerciseData: PerformedExercize = await this.performedExerciseService.findPerformedExerciseById(performedExerciseId);
      res.status(200).json({ data: findOnePerformedExerciseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPerformedExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExerciseData: PerformedExercizeDTO = req.body;
      const createPerformedExerciseData: PerformedExercize = await this.performedExerciseService.createPerformedExercise(performedExerciseData);
      res.status(201).json({ data: createPerformedExerciseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePerformedExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExerciseId: string = req.params.id;
      const performedExerciseData: PerformedExercizeDTO = req.body;
      const updatePerformedExerciseData: PerformedExercize = await this.performedExerciseService.updatePerformedExercise(
        performedExerciseId,
        performedExerciseData,
      );
      res.status(200).json({ data: updatePerformedExerciseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePerformedExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExerciseId: string = req.params.id;
      await this.performedExerciseService.deletePerformedExercise(performedExerciseId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PerformedExerciseController;
