import { LogEntry } from '../logs/entities/log-entry.entity';
import { Container } from '../logs/entities/container.entity';

export abstract class LogEntryStorageService {
  abstract save(logEntry: LogEntry): Promise<any>;

  abstract getAll(): void;

  abstract findLast(container: Container): Promise<LogEntry | null>;

  abstract removeAll(container: Container): void;
}
