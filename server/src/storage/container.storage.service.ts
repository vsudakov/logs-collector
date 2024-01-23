import { Container } from '../collectors/entities/container.entity';

export abstract class ContainerStorageService {
  abstract createIfNotExists(container: Container): Promise<any>;

  abstract findOne(containerId: string): Promise<Container | null>;
}
