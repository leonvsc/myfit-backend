import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ExerciseRoute from '@routes/exercise.route';
import WorkoutRoute from '@routes/workout.route';
import PerformedexerciseRoute from '@routes/performedexercise.route';
import SetRoute from '@routes/set.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new ExerciseRoute(), new WorkoutRoute(), new PerformedexerciseRoute(), new SetRoute()]);

app.listen();
