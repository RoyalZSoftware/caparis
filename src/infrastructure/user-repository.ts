import { User } from "../core/user";

export interface UserRepository {
    currentUser: User;
}