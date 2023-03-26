import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import {
  createLogger as createWinstonLogger,
  format,
  transports,
} from 'winston';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

const logger = createWinstonLogger({
  level: 'debug',
  format: format.json(),
  defaultMeta: {
    environment: process.env.NODE_ENV ?? 'development',
    app: 'safezone-api',
  },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize({ all: true })),
    }),
  );
}

async function setupApi(app: INestApplication) {
  const configService = app.get(ConfigService);
  const PORT = Number(configService.get('PORT'));
  return await app.listen(PORT, () => {
    logger.debug(`Listening on port ${PORT}`, {
      context: 'NestApplication',
    });
  });
}

async function setupPrisma(app: INestApplication) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const [, api] = await Promise.all([setupPrisma(app), setupApi(app)]);
  return api;
}

bootstrap();
