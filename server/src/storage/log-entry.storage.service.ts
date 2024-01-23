import { LogEntry } from '../collectors/entities/log-entry.entity';

export abstract class LogEntryStorageService {
  abstract save(logEntry: LogEntry): Promise<any>;

  abstract findAll(): void;

  abstract findLast(): LogEntry;

  abstract removeAll(collectorId: string): void;
}
