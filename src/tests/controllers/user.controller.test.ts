// user.controller.test.ts
import { NextFunction, Request, Response } from 'express';
import UserController from '@controllers/users.controller';
import UserService from '@services/users.service';

jest.mock('@services/users.service');

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    userController = new UserController();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    const mockUsers = [{ _id: '1', username: 'testuser', password: 'testpass' }];
    (UserService.prototype.findAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    await userController.getUsers(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockUsers, message: 'findAll' });
  });

  it('should get a user by id', async () => {
    const mockUser = { _id: '1', username: 'testuser', password: 'testpass' };
    (UserService.prototype.findUserById as jest.Mock).mockResolvedValue(mockUser);

    mockRequest.params = { id: '1' };

    await userController.getUserById(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: mockUser, message: 'findOne' });
  });

  it('should create a user', async () => {
    const mockUser = { username: 'testuser', password: 'testpass' };
    const createdUser = { _id: '1', ...mockUser };
    (UserService.prototype.createUser as jest.Mock).mockResolvedValue(createdUser);

    mockRequest.body = mockUser;

    await userController.createUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: createdUser, message: 'created' });
  });

  it('should update a user', async () => {
    const mockUser = { username: 'updateduser', password: 'updatedpass' };
    const updatedUser = { _id: '1', ...mockUser };
    (UserService.prototype.updateUser as jest.Mock).mockResolvedValue(updatedUser);

    mockRequest.params = { id: '1' };
    mockRequest.body = mockUser;

    await userController.updateUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ data: updatedUser, message: 'updated' });
  });

  it('should delete a user', async () => {
    (UserService.prototype.deleteUser as jest.Mock).mockResolvedValue({ _id: '1', username: 'testuser', password: 'testpass' });

    mockRequest.params = { id: '1' };

    await userController.deleteUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith({ message: 'deleted' });
  });
});
