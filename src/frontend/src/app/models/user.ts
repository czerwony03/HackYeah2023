import { UserId } from './user-id';
import { UserRole } from './user-role';

export class User {
  constructor(
    public readonly userId: UserId,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole) {
  }
};
