import { State } from './state';
import { Container } from './container.entity';

export interface Collector {
  state: State;
  container: Container;
}
