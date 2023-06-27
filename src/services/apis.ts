import { Alert } from "react-native";
import { URL } from "./url";

export async function fetchNews() {
  try {
    const response = await fetch(URL.newsAPI);
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }
    const newsData = await response.json();

    return newsData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
