import { NextFunction, Request, Response } from 'express';
import { PerformedExercize } from '@interfaces/performedexercize.interface';
import PerformedExercizeService from '@services/performedexercise.service';
import { PerformedExercizeDTO } from '@dtos/performedexercise.dto';

class PerformedExercizeController {
  public performedExercizeService = new PerformedExercizeService();

  public getPerformedExercizes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPerformedExercizesData: PerformedExercize[] = await this.performedExercizeService.findAllPerformedExercizes();
      res.status(200).json({ data: findAllPerformedExercizesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPerformedExercizeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExercizeId: string = req.params.id;
      const findOnePerformedExercizeData: PerformedExercize = await this.performedExercizeService.findPerformedExercizeById(performedExercizeId);
      res.status(200).json({ data: findOnePerformedExercizeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPerformedExercize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExercizeData: PerformedExercizeDTO = req.body;
      const createPerformedExercizeData: PerformedExercize = await this.performedExercizeService.createPerformedExercize(performedExercizeData);
      res.status(201).json({ data: createPerformedExercizeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePerformedExercize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExercizeId: string = req.params.id;
      const performedExercizeData: PerformedExercizeDTO = req.body;
      const updatePerformedExercizeData: PerformedExercize = await this.performedExercizeService.updatePerformedExercize(
        performedExercizeId,
        performedExercizeData,
      );
      res.status(200).json({ data: updatePerformedExercizeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePerformedExercize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const performedExercizeId: string = req.params.id;
      await this.performedExercizeService.deletePerformedExercize(performedExercizeId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PerformedExercizeController;
