import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Animated, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { DataUserContext } from "../../context/DataUserContext";
import { ToggleBtn } from "../darkMode/ToggleBtn";

interface Props {
  value: any;
}

const Header_Max_Height = 120;
const Header_Min_Height = 50;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

export const HeaderLogo = ({ value }: Props) => {
  const { token, setToken } = useContext(AuthContext);
  const { setDataUser } = useContext(DataUserContext);

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const handelLogout = async () => {
    setToken(null);
    setDataUser({
      id: 0,
      statut: "",
      niveau: "",
      parcours: "",
      statusAuth: false,
    });
  };

  return (
    <Animated.View
      className="relative shadow-sm dark:bg-black border-b border-gray-500"
      style={{
        height: animatedHeaderHeight,
      }}
    >
      <View className="flex flex-row justify-between items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <Text className="text-3xl mb-3">Logo</Text>
        <View className="flex flex-row items-center justify-center gap-5">
          <ToggleBtn />
          {token && (
            <MaterialCommunityIcons
              name="logout"
              size={25}
              color="black"
              onPress={handelLogout}
            />
          )}
        </View>
      </View>
    </Animated.View>
  );
};
