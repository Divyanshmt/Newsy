// reducers.js

import { combineReducers } from "@reduxjs/toolkit";
import fetchTime from "./src/globalSlices/fetchTime";
import pinnedNews from "./src/globalSlices/pinnedNews";
import newsReducer from "./src/screens/newsSlice";

const rootReducer: any = combineReducers({
  news: newsReducer,
  fetchTime: fetchTime,
  pinnedNews: pinnedNews,
});

export default rootReducer;
