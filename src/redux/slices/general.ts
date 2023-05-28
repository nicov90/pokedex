import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
}

export const generalReducer = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
})

export const { setIsLoading } = generalReducer.actions;
export default generalReducer.reducer;