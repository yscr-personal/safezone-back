import { DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { init, NodeOptions as SentryOptions } from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';
import { SentryService } from './sentry.service';

export const SENTRY_OPTIONS = 'SENTRY_OPTIONS';

@Module({
  providers: [SentryService],
  exports: [SentryService],
})
export class SentryModule {
  static forRoot(options: SentryOptions): DynamicModule {
    init(options);

    return {
      module: SentryModule,
      providers: [
        {
          provide: SENTRY_OPTIONS,
          useValue: <SentryOptions>{
            ...options,
            dsn: process.env.SENTRY_DSN,
            integrations: [],
          },
        },
        SentryService,
        {
          provide: APP_INTERCEPTOR,
          useClass: SentryInterceptor,
        },
      ],
      exports: [SentryService],
    };
  }
}
