import { createSlice, current } from "@reduxjs/toolkit";

const pinnedNews = createSlice({
  name: "pinnedNews",
  initialState: [],
  reducers: {
    updatePinnedNews: (state: any, action: any): any => {
      return [...state, action.payload];
    },
    deletePinnedNews: (state: any, action: any): any => {
      const index = action.payload;
      return [...state.filter((news: any, i: any) => i !== index)];
    },
  },
});

export const { updatePinnedNews, deletePinnedNews } = pinnedNews.actions;

export default pinnedNews.reducer;
