import { YupError } from "./types";
import { setError } from "../../redux/slices/account";
import * as Yup from "yup";
import { Dispatch } from "react";

const loginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().matches(/^\S+$/, 'No spaces in password allowed.'),
});

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid.").required("Email is required."),
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required().matches(/^\S+$/, 'No spaces in password allowed.'),
});

export const validateLoginInputs = async (dispatch: Dispatch<any>, 
  {username, password}: {username: string, password: string}) => {
  try {
    await loginSchema.validate({username, password}, { abortEarly: false });
    dispatch(setError({}));

    return true;
  } catch (error: any) {
    const errors: Record<string, string> = {};
    error.inner.forEach((err: YupError) => {
      errors[err.path!] = err.message;
    });
    dispatch(setError(errors));

    return false;
  }
};

export const validateRegisterInputs = async (dispatch: Dispatch<any>, data: any) => {
  try {
    await registerSchema.validate(data, { abortEarly: false });
    dispatch(setError({}));

    return true;
  } catch (error: any) {
    const errors: Record<string, string> = {};
    error.inner.forEach((err: YupError) => {
      errors[err.path!] = err.message;
    });
    dispatch(setError(errors));

    return false;
  }
};