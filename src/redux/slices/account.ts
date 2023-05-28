import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AccountType = {
  auth: boolean;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  errors: {};
};

const initialState: AccountType = {
  auth: false,
  email: "",
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  errors: {},
};

export const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFirstname: (state, action: PayloadAction<string>) => {
      state.firstname = action.payload;
    },
    setLastname: (state, action: PayloadAction<string>) => {
      state.lastname = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setError: (state, action: PayloadAction<{}>) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setAuth,
  setEmail,
  setFirstname,
  setLastname,
  setUsername,
  setPassword,
  setError,
} = accountReducer.actions;
export default accountReducer.reducer;
