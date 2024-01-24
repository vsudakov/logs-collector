import { Container } from '../logs/entities/container.entity';
import { State } from '../logs/entities/job.entity';
import { SearchContainersDto } from '../logs/dto/search-containers.dto';

export abstract class ContainerStorageService {
  abstract upsert(container: Container): Promise<any>;

  abstract getAll(): Promise<Container[]>;

  abstract findByState(state: State): Promise<Container[]>;

  abstract search(searchCriteria: SearchContainersDto): Promise<Container[]>;

  abstract updateState(
    container: Container,
    state: State,
  ): Promise<Container | null>;

  abstract remove(container: Container): Promise<void>;
}
