import { Camera, CameraView } from "expo-camera"; // Importez Camera depuis expo-camera
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { IQRCodeProps } from "../lib/IQRCodeProps";

const ScamScreen = () => {
  const [scanData, setScanData] = useState<IQRCodeProps>();
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status === "granted") {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.log(error);
      setPermission(false);
    }
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permission...</Text>
      </View>
    );
  }

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (scanData) {
    return (
      <View style={styles.container}>
        <Text>Name: {scanData.name}</Text>
        <Text>Number: {scanData.number}</Text>
        <Image source={{ uri: `asset:/${scanData.nameImg}` }} />
        <Button title="Scan again" onPress={() => setScanData(undefined)} />
      </View>
    );
  }

  if (permission) {
    return (
      <CameraView
        style={styles.container}
        onBarcodeScanned={({ type, data }) => {
          try {
            console.log(type);
            console.log(data);
            let _data = JSON.parse(data);
            setScanData(_data);
          } catch (error) {
            console.log("Unable to parse", error);
          }
        }}
      >
        <View style={styles.cameraView}>
          <Text style={styles.text}>Scan the QR Code</Text>
        </View>
      </CameraView>
    );
  }
};

export default ScamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 5,
    opacity: 0.7,
  },
});
