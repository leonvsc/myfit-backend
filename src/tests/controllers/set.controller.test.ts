import { NextFunction, Request, Response } from 'express';
import SetController from '@controllers/set.controller';
import SetService from '@services/set.service';

jest.mock('@services/set.service');

describe('SetController', () => {
  let setController: SetController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    setController = new SetController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a set by id', async () => {
    const mockSet = { _id: '1', exerciseId: '1', reps: 10, weight: 50 };
    (SetService.prototype.findSetById as jest.Mock).mockResolvedValue(mockSet);

    mockRequest.params = { id: '1' };

    await setController.getSetById(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockSet, message: 'findOne' });
  });

  it('should create a set', async () => {
    const mockSet = { exerciseId: '1', reps: 10, weight: 50 };
    const createdSet = { _id: '1', ...mockSet };
    (SetService.prototype.createSet as jest.Mock).mockResolvedValue(createdSet);

    mockRequest.body = mockSet;

    await setController.createSet(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: createdSet, message: 'created' });
  });

  it('should update a set', async () => {
    const mockSet = { exerciseId: '1', reps: 12, weight: 55 };
    const updatedSet = { _id: '1', ...mockSet };
    (SetService.prototype.updateSet as jest.Mock).mockResolvedValue(updatedSet);

    mockRequest.params = { id: '1' };
    mockRequest.body = mockSet;

    await setController.updateSet(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: updatedSet, message: 'updated' });
  });

  it('should delete a set', async () => {
    (SetService.prototype.deleteSet as jest.Mock).mockResolvedValue({ _id: '1', exerciseId: '1', reps: 10, weight: 50 });

    mockRequest.params = { id: '1' };

    await setController.deleteSet(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ message: 'deleted' });
  });
});
