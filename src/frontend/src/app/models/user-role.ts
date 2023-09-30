export class UserRole {
  constructor(
    public readonly roleName: string){
  }

  static User = new UserRole('user');
  static Administrator = new UserRole('administrator');
}
