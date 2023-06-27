import { createSlice, current } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    updateNews: (state: any, action: any): any => {
      return [...state, ...action.payload].sort(
        (a: any, b: any) => b.key - a.key
      );
    },
    deleteNews: (state: any, action: any): any => {
      const index: any = action.payload;
      return [...state.filter((news: any, i: any) => i !== index)];
    },
    insertNews: (state: any, action: any): any => {
      return [...state, action.payload];
    },
    clearNewsBucket: (): any => {
      return [];
    },
  },
});

export const { updateNews, deleteNews, clearNewsBucket, insertNews } =
  newsSlice.actions;

export default newsSlice.reducer;
