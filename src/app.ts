import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set, disconnect } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import * as path from 'node:path';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    try {
      await connect(dbConnection.url);
      console.log('Successfully connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Fitness API',
          version: '1.0.0',
          description: 'API voor het beheren van oefeningen, uitgevoerde oefeningen, sets, gebruikers en workouts.',
        },
        components: {
          schemas: {
            CreateExerciseDTO: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                duration: { type: 'number' },
              },
            },
            UpdateExerciseDTO: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                duration: { type: 'number' },
              },
            },
            PerformedExerciseDTO: {
              type: 'object',
              properties: {
                exerciseId: { type: 'string' },
                userId: { type: 'string' },
                date: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
              },
            },
            CreateSetDTO: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                repetitions: { type: 'integer' },
                weight: { type: 'number' },
              },
            },
            UpdateSetDTO: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                repetitions: { type: 'integer' },
                weight: { type: 'number' },
              },
            },
            CreateUserDto: {
              type: 'object',
              properties: {
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
              },
            },
            WorkoutDTO: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                duration: { type: 'number' },
              },
            },
          },
        },
      },
      apis: [path.join(__dirname, 'swagger.yaml')], // Zorg ervoor dat het pad naar swagger.yaml correct is
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
