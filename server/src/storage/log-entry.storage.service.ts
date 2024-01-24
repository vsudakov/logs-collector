import { LogEntry } from '../logs/entities/log-entry.entity';
import { Container } from '../logs/entities/container.entity';

export abstract class LogEntryStorageService {
  abstract save(logEntry: LogEntry): Promise<any>;

  abstract getByContainer(containerId: string): Promise<LogEntry[]>;

  abstract findLast(container: Container): Promise<LogEntry | null>;

  abstract removeAll(container: Container): Promise<void>;
}
