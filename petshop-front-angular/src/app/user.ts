export interface User {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  role: Role
}

enum Role{
  ADMIN,
  USER
}
