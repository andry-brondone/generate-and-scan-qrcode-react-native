import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import "./global.css";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import { DarkModeContext } from "./src/context/DarkModeContext";
import {
  DataUserContext,
  DataUserProvider,
} from "./src/context/DataUserContext";
import { LoadingContext, LoadingProvider } from "./src/context/LoadingContext";
import LandingScreen from "./src/screens/LandingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import QRCodeScreen from "./src/screens/QRCodeScreen";
import RegisterParticipantScreen from "./src/screens/RegisterParticipantScreen";
import RegisterStaffScreen from "./src/screens/RegisterStaffScreen";
import ScamScreen from "./src/screens/ScanScreen";

const Stack = createNativeStackNavigator();

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
        </AuthProvider>
      </DataUserProvider>
    </LoadingProvider>
  );
}

function AuthStack() {
  const { token } = useContext(AuthContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const { dataUser } = useContext(DataUserContext);

  console.log(isDarkMode);
  console.log(dataUser);
  console.log(token);

  return (
    <>
      <StatusBar className="bg-gray-700 text-black" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token &&
        dataUser.statusAuth &&
        (dataUser.statut === "délégué" ||
          dataUser.statut === "organisateur") ? (
          <Stack.Screen name="Landing" component={LandingScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen name="RegisterStaff" component={RegisterStaffScreen} />
        <Stack.Screen
          name="RegisterParticipant"
          component={RegisterParticipantScreen}
        />
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
        <Stack.Screen name="Scan" component={ScamScreen} />
      </Stack.Navigator>
    </>
  );
}

function RootNavigator() {
  const { isLoading } = useContext(LoadingContext);

  if (isLoading) {
    return (
      <View>
        <Text>Loading ......</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
