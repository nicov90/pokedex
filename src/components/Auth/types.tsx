import * as Yup from 'yup';

export type YupError = Yup.ValidationError;
export type LoginType = {
  username: string,
  password: string,
}
export interface UserType {
  email: string,
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  favorites: [],
}
export interface UserTypeWithId extends UserType {
  id: string,
}
export type UserKeyTypes = keyof UserType;