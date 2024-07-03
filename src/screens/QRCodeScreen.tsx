import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ButtonCustom from "../components/button/ButtonCustom";
import Container from "../components/container/Container";
import { FormValueProps } from "../lib/FormValueProps";
import { url } from "../utils/url";

const QRCodeScanner = ({ navigation }: any) => {
  const [participantData, setParticipantData] = useState<FormValueProps | null>(
    null
  );
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    }
  };

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    try {
      console.log(type);
      console.log(data);

      // Vérifier si le contenu est un JSON valide
      let _data;
      try {
        _data = JSON.parse(data);
      } catch (error) {
        setErrorMsg("QR code non valide");
        return;
      }

      const response = await axios.post(`${url}/personne/scan-qr`, {
        qrCodeId: _data.qrCodeId,
      });

      if (response.data.error) {
        console.log(response.data.error);
        setErrorMsg(response.data.error);
      } else {
        setParticipantData(response.data.data);
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const handleDeletePhoto = async (qrCodeId: string | undefined) => {
    try {
      await axios.post(`${url}/delete-photo`, { qrCodeId });
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting permission...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (participantData) {
    return (
      <>
        <View className="bg-gray-500/40 border-b-2 shadow-sm border-gray-500 p-4">
          <Text className="text-3xl text-center text-primary-400 font-bold">
            Ticket d'entrer
          </Text>
        </View>
        <ScrollView>
          <Container className="flex flex-col gap-4 pt-3">
            <View className="flex flex-col items-center justify-center">
              <Feather name="check-circle" size={60} color="#129AE8" />
              <Text className="text-center text-4xl text-secondary-blue">
                Valide
              </Text>
            </View>
            <Text style={styles.info}>
              Nom : {participantData.nom} {participantData.prenom}
            </Text>
            <Text style={styles.info}>
              classe : {participantData.niveau} {participantData.parcours}
            </Text>
            {/* <Text style={styles.info}>Email : {participantData.email}</Text> */}
            {participantData.photo && (
              <View style={styles.containerImage}>
                <Image
                  source={{ uri: `${url}/images/${participantData.photo}` }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            )}
            <ButtonCustom
              title="Scanner à nouveau"
              onPress={() => {
                handleDeletePhoto(participantData.qrCodeId);
                setParticipantData(null);
                setScanned(false);
              }}
            />
          </Container>
        </ScrollView>
      </>
    );
  }

  if (errorMsg) {
    return (
      <>
        <View className="bg-gray-500/40 border-b-2 shadow-sm border-gray-500 p-4">
          <Text className="text-3xl text-center text-primary-400 font-bold">
            Ticket d'entrer
          </Text>
        </View>
        <ScrollView>
          <Container className="flex flex-col gap-4 pt-3">
            <View className="flex flex-col items-center justify-center my-20">
              <Feather name="x-circle" size={60} color="#FF4E4E" />

              <Text className="text-center text-4xl text-alert-danger">
                Erreur
              </Text>
            </View>
            <Text className="text-center text-4xl mb-5">{errorMsg}</Text>

            <ButtonCustom
              title="Scanner à nouveau"
              onPress={() => {
                setErrorMsg(null);
                setScanned(false);
              }}
            />
            <ButtonCustom
              variant="secondary"
              title="Retour"
              onPress={() => navigation.navigate("Landing")}
            />
          </Container>
        </ScrollView>
      </>
    );
  }

  return (
    <CameraView
      style={styles.container}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
      <View style={styles.cameraView}>
        <Text style={styles.text}>Scanner le QR Code</Text>
      </View>
    </CameraView>
  );
};

export default QRCodeScanner;

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
  image: {
    width: "100%",
    height: "100%",
  },
  containerImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  info: {
    fontSize: 20,
    textAlign: "center",
  },
});
