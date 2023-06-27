import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchNews } from "../../services/apis";
import { updateNews } from "../newsSlice";
import NewsCard from "../../components/NewsCard";
import Header from "../../components/Header";
import WelcomeSplash from "../../components/WelcomSplash";
import { GLOBAL_VARIABLE } from "../../services/globalVariables";
import Loader from "../../components/Loader";

export default function App() {
  const dispatch = useDispatch();
  const newsList = useSelector((state: any) => state.news);
  const pinnedNewsList = useSelector((state: any) => state.pinnedNews);
  const fetchDuration = useSelector((state: any) => state.fetchTime);
  const [isAppLoading, setIsAPPLoading] = useState(true);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [APICallCount, setAPICallCount] = useState(0);

  const fetchNewsAndStore = async () => {
    let fetchedNewsList = await fetchNews();
    setAPICallCount(APICallCount + 1);
    dispatch(updateNews(fetchedNewsList));
    setIsAPPLoading(false);
    setIsLocalLoading(false);
  };

  const renderNewsComponent = (data: any) => {
    return data.item.isDeleted ? (
      <></>
    ) : (
      <NewsCard data={data.item} index={data.index} isPinned={false} />
    );
  };

  const renderPinnedNewsComponent = (data: any) => {
    return <NewsCard data={data.item} index={data.index} isPinned={true} />;
  };

  const fetchNewsManually = () => {
    setIsLocalLoading(true);
    setAPICallCount(0);
  };

  useEffect(() => {
    let intervalId = setInterval(fetchNewsAndStore, fetchDuration);
    console.log("inside use effect");
    if (APICallCount === GLOBAL_VARIABLE.MAX_API_CALL_COUNT) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchDuration, APICallCount]);

  return (
    <>
      {isAppLoading ? (
        <WelcomeSplash />
      ) : (
        <View>
          <Header manualReload={fetchNewsManually} />
          <Loader isLoading={isLocalLoading} />
          <ScrollView>
            <View style={styles.scrollcontainer}>
              {pinnedNewsList.length ? (
                <View>
                  <Text style={styles.pinnedStartText}>
                    ----- Pinned News ----
                  </Text>
                  <FlatList
                    data={pinnedNewsList}
                    renderItem={renderPinnedNewsComponent}
                    keyExtractor={(item) => item.key}
                  />
                  <Text style={styles.pinnedEndText}>
                    -----------------------
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <FlatList
                data={newsList}
                renderItem={renderNewsComponent}
                keyExtractor={(item) => item.key}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollcontainer: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingTop: 20,
  },
  pinnedStartText: {
    textAlign: "center",
    position: "relative",
    top: -10,
    color: "#999999",
  },
  pinnedEndText: {
    textAlign: "center",
    position: "relative",
    top: -10,
    color: "#999999",
  },
  refresh: {
    color: "blue",
    textAlign: "center",
  },
});
