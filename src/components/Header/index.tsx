import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { clearNewsBucket } from "../../screens/newsSlice";
import { updateFetchTime } from "../../globalSlices/fetchTime";

const Header = ({ manualReload }: any) => {
  const dispatch = useDispatch();

  const clearAllNews = () => {
    dispatch(clearNewsBucket());
  };

  const updateFetchDuration = (sec: any) => {
    const convertedInMillisec: any = sec * 1000;
    dispatch(updateFetchTime(convertedInMillisec)); // Convert to milliseconds
  };

  const [popupVisible, setPopupVisible] = useState(false);

  const handleTimeSelection = (time: any) => {
    setPopupVisible(false);
    updateFetchDuration(time);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={manualReload}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        </TouchableOpacity>
        <Text style={styles.logoText}>Headlines for today</Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity onPress={() => setPopupVisible(true)}>
            <Feather name="download-cloud" size={15} color="#24292D" />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearAllNews}>
            <Feather name="trash" size={15} color="#24292D" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={popupVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text>Select Time Duration:</Text>
            <TouchableOpacity onPress={() => handleTimeSelection(5)}>
              <Text>5 sec</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelection(15)}>
              <Text>15 sec</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelection(30)}>
              <Text>30 sec</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelection(45)}>
              <Text>45 sec</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelection(60)}>
              <Text>60 sec</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  optionContainer: {
    marginLeft: 10,
    width: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 70,
    height: 70,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
  },
});

export default Header;
