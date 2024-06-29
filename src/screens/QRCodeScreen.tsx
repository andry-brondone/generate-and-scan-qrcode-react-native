import React from "react";
import { Button, StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { IQRCodeProps } from "../lib/IQRCodeProps";

const QRCodeScreen = ({ navigation }: any) => {
  const payload: IQRCodeProps = {
    name: "Elon Musk",
    number: "06255515542",
    nameImg: "favicon.png",
  };

  return (
    <View style={styles.container}>
      <QRCode size={220} value={JSON.stringify(payload)} />
      <View style={styles.button}>
        <Button
          title="Go to Scanner"
          onPress={() => navigation.navigate("Scan")}
        />
      </View>
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingTop: 10,
  },
});
