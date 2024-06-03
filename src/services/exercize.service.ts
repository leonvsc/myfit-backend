import exerciseModel from '@models/exercise.model';
import { Exercise } from '@interfaces/exercise.interface';
import { HttpException } from '@exceptions/HttpException';
import { CreateExerciseDTO } from '@dtos/exercise.dto';

export class ExercizeService {
  public exercizes = exerciseModel;

  public async findAllExercize(): Promise<Exercise[]> {
    return this.exercizes.find();
  }

  public async findExercizeById(exercizeId: string): Promise<Exercise> {
    return this.exercizes.findById(exercizeId).orFail(() => {
      throw new HttpException(404, 'No exercise found for this ID');
    });
  }

  public async createExercise(exerciseData: CreateExerciseDTO): Promise<Exercise> {
    try {
      return this.exercizes.create(exerciseData);
    } catch (err) {
      throw new HttpException(400, 'Bad request: ' + err.message);
    }
  }


  public async deleteExercise(exerciseId: string): Promise<void> {
    try {
      this.exercizes.deleteOne(this.findExercizeById(exerciseId));
    } catch (err) {
      throw new HttpException(400, 'Bad request' + err.message);
    }
  }

  public async updateExercize(exerciseId: string, exerciseName: string): Promise<Exercise> {
    const result = await this.exercizes.updateOne({ _id: exerciseId }, { $set: { name: exerciseName } });

    if (result.modifiedCount === 0) {
      throw new Error('Exercise not found or name is the same as the current one.');
    }

    // Optioneel: Haal het bijgewerkte document op om terug te geven
    const updatedExercise = await this.exercizes.findOne({ _id: exerciseId });
    if (!updatedExercise) {
      throw new Error('Exercise not found after update.');
    }

    return updatedExercise as Exercise;
  }
}
