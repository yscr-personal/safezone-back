import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { captureException } from '@sentry/node';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { SentryService } from './sentry.service';

@Injectable({ scope: Scope.REQUEST })
export class SentryInterceptor implements NestInterceptor {
  constructor(private readonly sentryService: SentryService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    const span = this.sentryService.startChild({ op: `route handler` });

    return next.handle().pipe(
      catchError((error) => {
        captureException(error, this.sentryService.span.getTraceContext());
        return throwError(() => error);
      }),
      finalize(() => {
        span.finish();
        this.sentryService.span.finish();
      }),
    );
  }
}
