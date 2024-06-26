import { NextFunction, Request, Response } from 'express';
import ExerciseController from '../../controllers/exercise.controller';
import ExerciseService from '../../services/exercise.service';

jest.mock('../../services/exercise.service');

describe('ExerciseController', () => {
  let exerciseController: ExerciseController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    exerciseController = new ExerciseController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all exercises', async () => {
    const mockExercises = [{ _id: '1', name: 'Push-ups', description: 'A basic exercise.' }];
    (ExerciseService.prototype.findAllExercize as jest.Mock).mockResolvedValue(mockExercises);

    await exerciseController.getExercises(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockExercises, message: 'findAll' });
  });

  it('should get an exercise by id', async () => {
    const mockExercise = { _id: '1', name: 'Push-ups', description: 'A basic exercise.' };
    (ExerciseService.prototype.findExercizeById as jest.Mock).mockResolvedValue(mockExercise);

    mockRequest.params = { id: '1' };

    await exerciseController.getExerciseById(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockExercise, message: 'findOne' });
  });

  it('should create an exercise', async () => {
    const mockExercise = { name: 'Push-ups', description: 'A basic exercise.' };
    const createdExercise = { _id: '1', ...mockExercise };
    (ExerciseService.prototype.createExercise as jest.Mock).mockResolvedValue(createdExercise);

    mockRequest.body = mockExercise;

    await exerciseController.createExercise(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: createdExercise, message: 'created' });
  });

  it('should update an exercise', async () => {
    const mockExercise = { name: 'Sit-ups', description: 'A basic exercise.' };
    const updatedExercise = { _id: '1', ...mockExercise };
    (ExerciseService.prototype.updateExercize as jest.Mock).mockResolvedValue(updatedExercise);

    mockRequest.params = { id: '1' };
    mockRequest.body = mockExercise;

    await exerciseController.updateExercise(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: updatedExercise, message: 'updated' });
  });

  it('should delete an exercise', async () => {
    (ExerciseService.prototype.deleteExercise as jest.Mock).mockResolvedValue({ _id: '1', name: 'Push-ups', description: 'A basic exercise.' });

    mockRequest.params = { id: '1' };

    await exerciseController.deleteExercise(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ message: 'deleted' });
  });
});
