import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useContext, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import ButtonCustom from "../components/button/ButtonCustom";
import CameraCapture from "../components/camera-capture/CameraCapture";
import Container from "../components/container/Container";
import CustomTextInput from "../components/form/CustomTextInput";
import { DataUserContext } from "../context/DataUserContext";
import { FormValueProps } from "../lib/FormValueProps";
import { url } from "../utils/url";
import { validationSchemaParticipant } from "../utils/ValidationSchemasYup";

export default function RegisterParticipantScreen({ navigation }: any) {
  const cameraRef = useRef<{ resetImage: () => void }>(null);
  const { dataUser } = useContext(DataUserContext);

  const initialValues: FormValueProps = {
    nom: "",
    prenom: "",
    email: "",
    niveau: dataUser.niveau,
    parcours: dataUser.parcours,
    photo: "",
  };

  const onSubmit = async (
    data: FormValueProps,
    actions: FormikHelpers<FormValueProps>
  ) => {
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("prenom", data.prenom);
    formData.append("email", data.email);
    formData.append("niveau", data.niveau);
    formData.append("parcours", data.parcours);

    if (data.photo) {
      formData.append("photo", {
        uri: data.photo,
        type: "image/jpeg",
        name: "photo.jpg",
      } as any);
    }

    try {
      const res = await axios.post(
        `${url}/personne/add-participant`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.Status === "Success") {
        console.log("ok");
        actions.resetForm();
        if (cameraRef.current) {
          cameraRef.current.resetImage();
        }
      } else if (res.data.Status === "erreurConnexionBD") {
        console.log("Verifier votre connexion internet");
      } else if (res.data.Status === "duplication") {
        console.log("Cette adresse e-mail existe déjà");
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <>
      <View className="flex flex-row items-center justify-between bg-gray-500/60 border-b-2 shadow-sm border-gray-500 p-4">
        <Text className="text-2xl text-center">Ajouter un participant</Text>
        <ButtonCustom
          variant="secondary"
          onPress={() => navigation.navigate("Landing")}
          title="Retour"
          className="py-1 px-5 text-sm"
        />
      </View>
      <ScrollView>
        <Container className="pt-4">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchemaParticipant}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                <CustomTextInput
                  label="Nom"
                  placeholder="ex. ANDRIAMBOLOLOMANANA"
                  onChangeText={handleChange("nom")}
                  onBlur={handleBlur("nom")}
                  value={values.nom}
                  error={touched.nom && errors.nom}
                  touched={!!touched.nom}
                />

                <CustomTextInput
                  label="Prénom"
                  placeholder="ex. Brondone"
                  onChangeText={handleChange("prenom")}
                  onBlur={handleBlur("prenom")}
                  value={values.prenom}
                  error={touched.prenom && errors.prenom}
                  touched={!!touched.prenom}
                />

                <CustomTextInput
                  label="Email"
                  placeholder="ex. andry.brondone@gmail.com"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={touched.email && errors.email}
                  touched={!!touched.email}
                />

                <CustomTextInput
                  label="Niveau"
                  placeholder="ex. andry.brondone@gmail.com"
                  onChangeText={handleChange("niveau")}
                  onBlur={handleBlur("niveau")}
                  value={values.niveau}
                  error={touched.niveau && errors.niveau}
                  touched={!!touched.niveau}
                  hidden
                />

                <CustomTextInput
                  label="Parcours"
                  placeholder="ex. andry.brondone@gmail.com"
                  onChangeText={handleChange("parcours")}
                  onBlur={handleBlur("parcours")}
                  value={values.parcours}
                  error={touched.parcours && errors.parcours}
                  touched={!!touched.parcours}
                  hidden
                />

                <CameraCapture
                  ref={cameraRef}
                  setFieldValue={setFieldValue}
                  error={touched.photo && errors.photo}
                  touched={!!touched.photo}
                />

                <ButtonCustom
                  className="mt-6"
                  title="Enregistrer"
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </Container>
      </ScrollView>
    </>
  );
}
