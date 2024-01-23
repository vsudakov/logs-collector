import { Collector } from './collector.entity';

export interface LogEntry {
  text: string;
  collector: Collector;
}
