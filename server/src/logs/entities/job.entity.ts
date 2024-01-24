import { Container } from './container.entity';

export interface Job {
  state: State;
}

export enum State {
  FOLLOWING = 'following',
  ERROR = 'error',
  COMPLETED = 'completed',
  PAUSED = 'paused',
}
