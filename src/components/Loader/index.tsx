import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

interface LoaderProps {
  size?: "small" | "large";
  color?: string;
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  color = "#000000",
  isLoading,
}) => {
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Loader;
