import { getRepository as getFirestoreRepository, IEntity, EntityConstructorOrPath, IRepository } from 'fireorm';

export function getRepository<T extends IEntity>(entityConstructorOrPath: EntityConstructorOrPath<T>): IRepository<T> {
    return getFirestoreRepository<T>(entityConstructorOrPath);
}