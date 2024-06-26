import performedExerciseModel from '@models/performedexercize.model';
import { PerformedExercize } from '@interfaces/performedexercize.interface';
import { HttpException } from '@exceptions/HttpException';
import { PerformedExercizeDTO } from '@dtos/performedexercise.dto';

class PerformedExerciseService {
  public performedExercises = performedExerciseModel;

  public async findAllPerformedExercises(): Promise<PerformedExercize[]> {
    return this.performedExercises.find();
  }

  public async findPerformedExerciseById(performedExerciseId: string): Promise<PerformedExercize> {
    return this.performedExercises.findById(performedExerciseId).orFail(() => {
      throw new HttpException(404, 'No performed exercise found for this ID');
    });
  }

  public async createPerformedExercise(performedExerciseData: PerformedExercizeDTO): Promise<PerformedExercize> {
    try {
      return this.performedExercises.create(performedExerciseData);
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async deletePerformedExercise(performedExerciseId: string): Promise<void> {
    try {
      const deleteResult = await this.performedExercises.deleteOne({ _id: performedExerciseId });
      if (deleteResult.deletedCount === 0) {
        throw new HttpException(404, 'No performed exercise found for this ID');
      }
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async updatePerformedExercise(performedExerciseId: string, performedExerciseData: PerformedExercizeDTO): Promise<PerformedExercize> {
    const result = await this.performedExercises.updateOne({ _id: performedExerciseId }, { $set: performedExerciseData });

    if (result.modifiedCount === 0) {
      throw new HttpException(404, 'Performed exercise not found or no changes made.');
    }

    const updatedPerformedExercise = await this.performedExercises.findOne({ _id: performedExerciseId });
    if (!updatedPerformedExercise) {
      throw new HttpException(404, 'Performed exercise not found after update.');
    }

    return updatedPerformedExercise as PerformedExercize;
  }
}

export default PerformedExerciseService;
