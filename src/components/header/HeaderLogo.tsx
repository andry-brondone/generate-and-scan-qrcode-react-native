import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Animated, Image, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { DataUserContext } from "../../context/DataUserContext";
import { iconApp } from "../../utils/url";
import { ToggleBtn } from "../darkMode/ToggleBtn";

interface Props {
  value: any;
}

const Header_Max_Height = 120;
const Header_Min_Height = 60;
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
      className="relative shadow-sm border-b border-gray-500 bg-white"
      style={{
        height: animatedHeaderHeight,
      }}
    >
      <View className="flex flex-row justify-between items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <View className="flex flex-row items-center gap-1">
          <Image source={iconApp} className="w-12 h-12" />
          <View className="flex items-start">
            <Text className="text-3xl -mt-4 text-primary font-bold">
              e-recep
            </Text>
            <Text className="text-sm -mt-2 text-gray-800/60">
              Ticket d'entrée
            </Text>
          </View>
        </View>
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
