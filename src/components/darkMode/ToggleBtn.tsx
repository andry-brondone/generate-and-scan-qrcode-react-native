import { Feather } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { DarkModeContext } from "../../context/DarkModeContext";

export const ToggleBtn = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDarkMode]);

  return (
    <TouchableOpacity onPress={toggleDarkMode}>
      <Animated.View style={{ opacity: animation }}>
        {isDarkMode ? (
          <Feather name="moon" size={25} color="white" />
        ) : (
          <Feather name="sun" size={25} color="orange" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
