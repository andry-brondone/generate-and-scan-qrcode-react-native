import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import "./global.css";
import Loading from "./src/components/loading/Loading";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import {
  DataUserContext,
  DataUserProvider,
} from "./src/context/DataUserContext";
import { LoadingContext, LoadingProvider } from "./src/context/LoadingContext";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import QRCodeScanner from "./src/screens/QRCodeScreen";
import RegisterParticipantScreen from "./src/screens/RegisterParticipantScreen";
import RegisterStaffScreen from "./src/screens/RegisterStaffScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { setToken } = useContext(AuthContext);
  const { dataUser } = useContext(DataUserContext);

  useEffect(() => {
    if (!dataUser.statusAuth) {
      setToken(null);
    }
  }, [dataUser.statusAuth]);

  return (
    <LoadingProvider>
      <DataUserProvider>
        <AuthProvider>
          <RootNavigator />
          <Toast />
        </AuthProvider>
      </DataUserProvider>
    </LoadingProvider>
  );
}

function AuthStack() {
  return (
    <>
      <StatusBar className="bg-gray-700 text-black" />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
}

function MainTabs() {
  const { dataUser } = useContext(DataUserContext);

  return (
    <>
      <StatusBar className="bg-gray-700 text-black" />

      <Tab.Navigator
        initialRouteName="Accuiel"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#129AE8",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            if (route.name === "Accuiel") {
              iconName = focused ? "home" : "home-outline";
            } else if (
              route.name === "Ajouter un staff" ||
              route.name === "Ajouter un participant"
            ) {
              iconName = focused ? "person-add" : "person-add-outline";
            } else if (route.name === "Scanne QRCode") {
              iconName = focused ? "qr-code" : "qr-code-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        {dataUser.statut === "organisateur" && (
          <Tab.Screen name="Ajouter un staff" component={RegisterStaffScreen} />
        )}
        {dataUser.statut === "délégué" && (
          <Tab.Screen
            name="Ajouter un participant"
            component={RegisterParticipantScreen}
          />
        )}
        <Tab.Screen name="Accuiel" component={LandingScreen} />
        <Tab.Screen name="Scanne QRCode" component={QRCodeScanner} />
      </Tab.Navigator>
    </>
  );
}

function RootNavigator() {
  const { isLoading } = useContext(LoadingContext);
  const { token } = useContext(AuthContext);
  const { dataUser } = useContext(DataUserContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {!dataUser.statusAuth && token ? (
        <Loading />
      ) : !token || !dataUser.statusAuth ? (
        <AuthStack />
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
}
