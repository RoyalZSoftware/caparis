export class UserScopedModel {
    createdById: string;
}

export type PartialUserScopedModel<T> = Partial<UserScopedModel> & {createdById: string};