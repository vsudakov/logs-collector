import { Container } from './container.entity';

export interface LogEntry {
  timestamp: string;
  text: string;
  container: Container;
}
