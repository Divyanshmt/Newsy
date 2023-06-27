import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  deletePinnedNews,
  updatePinnedNews,
} from "../../globalSlices/pinnedNews";
import { deleteNews, insertNews, updateNews } from "../../screens/newsSlice";
import { getTimeAgo } from "../../services/functions/bookFunctions";
import { NewsCardPropsIntrface } from "./interface";

const NewsCard: React.FC<NewsCardPropsIntrface> = ({
  data,
  index,
  isPinned,
}: NewsCardPropsIntrface) => {
  const dispatch = useDispatch();

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (_, gestureState) => {
      // Set conditions to capture pan gestures
      return gestureState.dx < -20; // Adjust threshold as per your preference
    },
    onPanResponderMove: (_, gestureState) => {
      pan.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -120) {
        // Swipe left: delete item

        if (isPinned) {
          dispatch(deletePinnedNews(index));
        } else {
          dispatch(deleteNews(index));
        }
      } else {
        // No swipe: reset position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const renderPin = (news: any, index: any, isPinned: any) => {
    return isPinned ? (
      <TouchableOpacity
        onPress={() => {
          dispatch(deletePinnedNews(index));
          dispatch(insertNews(news));
        }}
        style={styles.pinImageContainer}
      >
        <Image
          style={styles.pinImage}
          source={require("../../assets/images/pin-active.png")}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          dispatch(updatePinnedNews(data));
          dispatch(deleteNews(index));
        }}
        style={styles.pinImageContainer}
      >
        <Image
          style={styles.pinImage}
          source={require("../../assets/images/pin-inactive.png")}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  };

  const itemStyles = [
    isPinned ? styles.pinnedContainer : styles.container,
    { transform: [{ translateX: pan.x }] },
  ];

  return (
    <Animated.View {...panResponder.panHandlers} style={itemStyles}>
      <Image
        source={{
          uri: "https://fastly.picsum.photos/id/503/200/300.jpg?hmac=NvjgwV94HmYqnTok1qtlPsDxdf197x8fsWy5yheKlGg",
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textDataContainer}>
        <Text style={styles.headline} numberOfLines={2} ellipsizeMode="tail">
          {data.headline}
        </Text>
        <Text style={styles.article} numberOfLines={2} ellipsizeMode="tail">
          {data.article}
        </Text>
      </View>
      {renderPin(data, index, isPinned)}
      <Text style={styles.dateText} numberOfLines={2} ellipsizeMode="tail">
        {getTimeAgo(data.date)}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    position: "relative",
  },
  pinnedContainer: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#ddd7ba",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textDataContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headline: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  article: {
    fontSize: 12,
    width: 200,
  },
  pinImageContainer: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  pinImage: {
    borderRadius: 4,
    width: 20,
    height: 20,
  },
  pinButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dateText: {
    marginTop: 5,
    fontSize: 8,
  },
});

export default NewsCard;
