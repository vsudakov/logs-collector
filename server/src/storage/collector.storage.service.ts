import { Collector } from '../collectors/entities/collector.entity';
import { State } from '../collectors/entities/state';

export abstract class CollectorStorageService {
  abstract createIfNotExists(collector: Collector): Promise<any>;

  abstract findOne(containerId: string): Promise<Collector | null>;

  abstract updateState(id: string, state: State): Promise<Collector | null>;
}
