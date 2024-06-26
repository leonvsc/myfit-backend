import { NextFunction, Request, Response } from 'express';
import WorkoutController from '../../controllers/workout.controller';
import WorkoutService from '../../services/workout.service';

jest.mock('../../services/workout.service');

describe('WorkoutController', () => {
  let workoutController: WorkoutController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    workoutController = new WorkoutController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all workouts', async () => {
    const mockWorkouts = [{ _id: '1', totalTime: 60, exercises: [] }];
    (WorkoutService.prototype.findAllWorkouts as jest.Mock).mockResolvedValue(mockWorkouts);

    await workoutController.getWorkouts(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockWorkouts, message: 'findAll' });
  });

  it('should get a workout by id', async () => {
    const mockWorkout = { _id: '1', totalTime: 60, exercises: [] };
    (WorkoutService.prototype.findWorkoutById as jest.Mock).mockResolvedValue(mockWorkout);

    mockRequest.params = { id: '1' };

    await workoutController.getWorkoutById(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockWorkout, message: 'findOne' });
  });

  it('should create a workout', async () => {
    const mockWorkout = { totalTime: 60, exercises: [] };
    const createdWorkout = { _id: '1', ...mockWorkout };
    (WorkoutService.prototype.createWorkout as jest.Mock).mockResolvedValue(createdWorkout);

    mockRequest.body = mockWorkout;

    await workoutController.createWorkout(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: createdWorkout, message: 'created' });
  });

  it('should update a workout', async () => {
    const mockWorkout = { totalTime: 70, exercises: [] };
    const updatedWorkout = { _id: '1', ...mockWorkout };
    (WorkoutService.prototype.updateWorkout as jest.Mock).mockResolvedValue(updatedWorkout);

    mockRequest.params = { id: '1' };
    mockRequest.body = mockWorkout;

    await workoutController.updateWorkout(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: updatedWorkout, message: 'updated' });
  });

  it('should delete a workout', async () => {
    (WorkoutService.prototype.deleteWorkout as jest.Mock).mockResolvedValue({ _id: '1', totalTime: 60, exercises: [] });

    mockRequest.params = { id: '1' };

    await workoutController.deleteWorkout(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ message: 'deleted' });
  });
});
