import * as ImagePicker from "expo-image-picker";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Alert, Image, StyleSheet, Text } from "react-native";
import ButtonCustom from "../button/ButtonCustom";

interface CameraCaptureProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  error?: string | false | undefined;
  touched?: boolean;
}

const CameraCapture = forwardRef<{}, CameraCaptureProps>(
  ({ setFieldValue, error, touched }, ref) => {
    const [photo, setPhoto] = useState<string | null>(null);

    const handleTakePhoto = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de la permission de la caméra pour prendre des photos."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setPhoto(uri);
        setFieldValue("photo", uri);
      }
    };

    useImperativeHandle(ref, () => ({
      resetImage() {
        setPhoto(null);
      },
    }));

    return (
      <>
        <Text className="text-lg mb-1 mt-0.5">
          Photo
          <Text className=" text-alert-danger"> *</Text>
        </Text>
        <ButtonCustom
          variant="outline"
          title="Prendre une photo"
          onPress={handleTakePhoto}
        />
        {photo && (
          <Image source={{ uri: photo }} className="my-5 w-full h-80" />
        )}
        {touched && error && (
          <Text className="text-alert-danger/90">{error}</Text>
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  photo: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default CameraCapture;
