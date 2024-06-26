import WorkoutService from '@services/workout.service';
import WorkoutModel from '@models/workout.model';

jest.mock('@models/workout.model');

describe('WorkoutService', () => {
  let workoutService: WorkoutService;

  beforeEach(() => {
    workoutService = new WorkoutService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find all workouts', async () => {
    const mockWorkouts = [{ _id: '1', totalTime: 60, exercises: [] }];
    (WorkoutModel.find as jest.Mock).mockResolvedValue(mockWorkouts);

    const result = await workoutService.findAllWorkouts();

    expect(result).toEqual(mockWorkouts);
  });

  it('should create a workout', async () => {
    const mockWorkout = { _id: '1', totalTime: 60, exercises: [] };
    const createdWorkout = { _id: '1', ...mockWorkout };
    (WorkoutModel.create as jest.Mock).mockResolvedValue(createdWorkout);

    const result = await workoutService.createWorkout(mockWorkout);

    expect(result).toEqual(createdWorkout);
  });
});
