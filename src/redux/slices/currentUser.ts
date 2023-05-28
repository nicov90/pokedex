import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { UserTypeWithId } from "../../components/Auth/types";

interface State {
  currentUser: UserTypeWithId
}
const initialState: State = {
  currentUser: {
    id: "",
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    favorites: [],
  },
};

// Definición de la acción de restablecimiento
export const resetCurrentUser = createAction("resetCurrentUser");

export const currentUserReducer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserTypeWithId>) => {
     state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetCurrentUser, (state) => {
      state.currentUser = initialState.currentUser;
    });
  },
})

export const { setCurrentUser } = currentUserReducer.actions;
export default currentUserReducer.reducer;