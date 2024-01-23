import { Container } from '../logs/entities/container.entity';

export abstract class ContainerStorageService {
  abstract upsert(container: Container): Promise<any>;

  abstract findOne(containerId: string): Promise<Container | null>;
}
