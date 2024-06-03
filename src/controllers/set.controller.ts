import { NextFunction, Request, Response } from 'express';
import { Set } from '@interfaces/set.interface';
import SetService from '@services/set.service';
import { CreateSetDTO, UpdateSetDTO } from '@dtos/set.dto';

class SetController {
  public setService = new SetService();

  public getSetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const setId: string = req.params.id;
      const findOneSetData: Set = await this.setService.findSetById(setId);
      res.status(200).json({ data: findOneSetData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const setData: CreateSetDTO = req.body;
      const createSetData: Set = await this.setService.createSet(setData);
      res.status(201).json({ data: createSetData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const setId: string = req.params.id;
      const setData: UpdateSetDTO = req.body;
      const updateSetData: Set = await this.setService.updateSet(setId, setData);
      res.status(200).json({ data: updateSetData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const setId: string = req.params.id;
      await this.setService.deleteSet(setId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SetController;
