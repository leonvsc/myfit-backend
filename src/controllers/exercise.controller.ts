import { NextFunction, Request, Response } from 'express';
import { Exercise } from '@interfaces/exercise.interface';
import { ExercizeService } from '@services/exercize.service';
import { CreateExerciseDTO, UpdateExerciseDTO } from '@dtos/exercise.dto';

class ExerciseController {
  public exerciseService = new ExercizeService();

  public getExercises = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllExercisesData: Exercise[] = await this.exerciseService.findAllExercize();
      res.status(200).json({ data: findAllExercisesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getExerciseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exerciseId: string = req.params.id;
      const findOneExerciseData: Exercise = await this.exerciseService.findExercizeById(exerciseId);
      res.status(200).json({ data: findOneExerciseData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exerciseData: CreateExerciseDTO = req.body;
      const createExerciseData: Exercise = await this.exerciseService.createExercise(exerciseData);
      res.status(201).json({ data: createExerciseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exerciseId: string = req.params.id;
      const exerciseData: UpdateExerciseDTO = req.body;
      const updateExerciseData: Exercise = await this.exerciseService.updateExercize(exerciseId, exerciseData.name);
      res.status(200).json({ data: updateExerciseData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const exerciseId: string = req.params.id;
      await this.exerciseService.deleteExercise(exerciseId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ExerciseController;
