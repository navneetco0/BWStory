
import { Platform, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export const useStatusBarColor = (
  color: string="#fff",
  theme: ThemeTypes = "dark-content"
) => {
  useFocusEffect(() => {
    if (Platform.OS === "android") {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor(color);
      }
      StatusBar.setBarStyle(theme);
  });
};

type ThemeTypes = "light-content" | "dark-content";