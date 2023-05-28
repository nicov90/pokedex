import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: '',
}

export const registerReducer = createSlice({
  name: "register",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    }
  }
})

export const { setErrorMessage } = registerReducer.actions;
export default registerReducer.reducer;