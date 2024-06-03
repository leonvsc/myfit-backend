import setModel from '@models/set.model';
import performedExercizeModel from '@models/performedexercize.model';
import { Set } from '@interfaces/set.interface';
import { HttpException } from '@exceptions/HttpException';
import { CreateSetDTO, UpdateSetDTO } from '@dtos/set.dto';

class SetService {
  public sets = setModel;
  public performedExercizes = performedExercizeModel;

  public async findSetById(setId: string): Promise<Set> {
    return this.sets.findById(setId).orFail(() => {
      throw new HttpException(404, 'No set found for this ID');
    });
  }

  public async createSet(setData: CreateSetDTO): Promise<Set> {
    const performedExercize = await this.performedExercizes.findById(setData.performedExercizeId).orFail(() => {
      throw new HttpException(404, 'No performed exercise found for this ID');
    });

    const newSet = new this.sets({
      reps: setData.reps,
      weight: setData.weight,
    });

    const savedSet = await newSet.save();

    performedExercize.sets.push(savedSet._id);
    await performedExercize.save();

    return savedSet;
  }

  public async deleteSet(setId: string): Promise<void> {
    try {
      const deleteResult = await this.sets.deleteOne({ _id: setId });
      if (deleteResult.deletedCount === 0) {
        throw new HttpException(404, 'No set found for this ID');
      }
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }

  public async updateSet(setId: string, setData: UpdateSetDTO): Promise<Set> {
    const result = await this.sets.updateOne({ _id: setId }, { $set: setData });

    if (result.modifiedCount === 0) {
      throw new HttpException(404, 'Set not found or no changes made.');
    }

    return result as unknown as Set;
  }
}

export default SetService;
