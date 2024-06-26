import { NextFunction, Request, Response } from 'express';
import PerformedExerciseController from '@controllers/performedExercise.controller';
import PerformedExerciseService from '@services/performedExercise.service';

jest.mock('@services/performedExercise.service');

describe('PerformedExerciseController', () => {
  let performedExerciseController: PerformedExerciseController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    performedExerciseController = new PerformedExerciseController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all performed exercises', async () => {
    const mockPerformedExercises = [{ _id: '1', exerciseId: '1', sets: 3, reps: 10 }];
    (PerformedExerciseService.prototype.findAllPerformedExercises as jest.Mock).mockResolvedValue(mockPerformedExercises);

    await performedExerciseController.getPerformedExercises(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockPerformedExercises, message: 'findAll' });
  });

  it('should get a performed exercise by id', async () => {
    const mockPerformedExercise = { _id: '1', exerciseId: '1', sets: 3, reps: 10 };
    (PerformedExerciseService.prototype.findPerformedExerciseById as jest.Mock).mockResolvedValue(mockPerformedExercise);

    mockRequest.params = { id: '1' };

    await performedExerciseController.getPerformedExerciseById(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockPerformedExercise, message: 'findOne' });
  });

  it('should create a performed exercise', async () => {
    const mockPerformedExercise = { exerciseId: '1', sets: 3, reps: 10 };
    const createdPerformedExercise = { _id: '1', ...mockPerformedExercise };
    (PerformedExerciseService.prototype.createPerformedExercise as jest.Mock).mockResolvedValue(createdPerformedExercise);

    mockRequest.body = mockPerformedExercise;

    await performedExerciseController.createPerformedExercise(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: createdPerformedExercise, message: 'created' });
  });

  it('should update a performed exercise', async () => {
    const mockPerformedExercise = { exerciseId: '1', sets: 4, reps: 12 };
    const updatedPerformedExercise = { _id: '1', ...mockPerformedExercise };
    (PerformedExerciseService.prototype.updatePerformedExercise as jest.Mock).mockResolvedValue(updatedPerformedExercise);

    mockRequest.params = { id: '1' };
    mockRequest.body = mockPerformedExercise;

    await performedExerciseController.updatePerformedExercise(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: updatedPerformedExercise, message: 'updated' });
  });

  it('should delete a performed exercise', async () => {
    (PerformedExerciseService.prototype.deletePerformedExercise as jest.Mock).mockResolvedValue({ _id: '1', exerciseId: '1', sets: 3, reps: 10 });

    mockRequest.params = { id: '1' };

    await performedExerciseController.deletePerformedExercise(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ message: 'deleted' });
  });
});
