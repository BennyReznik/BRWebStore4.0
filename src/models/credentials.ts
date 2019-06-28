export enum UserRole {
  Admin = "admin",
  Contributor = "contributor",
  Reader = "reader"
}

export interface ICredential {
  email: string;
  password: string;
  roles: UserRole[];
}

export interface IUserCredential extends ICredential {
  userId: number;
}
