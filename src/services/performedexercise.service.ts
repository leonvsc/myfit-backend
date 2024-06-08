import performedExercizeModel from '@models/performedexercize.model';
import { PerformedExercize } from '@interfaces/performedexercize.interface';
import { HttpException } from '@exceptions/HttpException';
import { PerformedExercizeDTO } from '@dtos/performedexercise.dto';

class PerformedExercizeService {
  public performedExercizes = performedExercizeModel;

  public async findAllPerformedExercizes(): Promise<PerformedExercize[]> {
    return this.performedExercizes.find();
  }

  public async findPerformedExercizeById(performedExercizeId: string): Promise<PerformedExercize> {
    return this.performedExercizes.findById(performedExercizeId).orFail(() => {
      throw new HttpException(404, 'No performed exercise found for this ID');
    });
  }

  public async createPerformedExercize(performedExercizeData: PerformedExercizeDTO): Promise<PerformedExercize> {
    try {
      return this.performedExercizes.create(performedExercizeData);
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async deletePerformedExercize(performedExercizeId: string): Promise<void> {
    try {
      const deleteResult = await this.performedExercizes.deleteOne({ _id: performedExercizeId });
      if (deleteResult.deletedCount === 0) {
        throw new HttpException(404, 'No performed exercise found for this ID');
      }
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async updatePerformedExercize(performedExercizeId: string, performedExercizeData: PerformedExercizeDTO): Promise<PerformedExercize> {
    const result = await this.performedExercizes.updateOne({ _id: performedExercizeId }, { $set: performedExercizeData });

    if (result.modifiedCount === 0) {
      throw new HttpException(404, 'Performed exercise not found or no changes made.');
    }

    const updatedPerformedExercize = await this.performedExercizes.findOne({ _id: performedExercizeId });
    if (!updatedPerformedExercize) {
      throw new HttpException(404, 'Performed exercise not found after update.');
    }

    return updatedPerformedExercize as PerformedExercize;
  }
}

export default PerformedExercizeService;
