import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private loggers: Map<string, Logger> = new Map();

  getLogger(context: string): Logger {
    let logger = this.loggers.get(context);

    if (!logger) {
      logger = new Logger(context);
      this.loggers.set(context, logger);
    }

    return logger;
  }
}
