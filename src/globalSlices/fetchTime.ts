import { createSlice, current } from "@reduxjs/toolkit";

const fetchTime = createSlice({
  name: "fetchTime",
  initialState: 5000,
  reducers: {
    updateFetchTime: (state: any, action: any): any => {
      return action.payload;
    },
  },
});

export const { updateFetchTime } = fetchTime.actions;

export default fetchTime.reducer;
