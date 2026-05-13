import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import React, { useContext, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import ButtonCustom from "../components/button/ButtonCustom";
import CameraCapture from "../components/camera-capture/CameraCapture";
import Container from "../components/container/Container";
import CustomTextInput from "../components/form/CustomTextInput";
import { DataUserContext } from "../context/DataUserContext";
import { FormValueProps } from "../lib/FormValueProps";
import { url } from "../utils/url";
import { validationSchemaParticipant } from "../utils/ValidationSchemasYup";

export default function RegisterParticipantScreen() {
  const cameraRef = useRef<{ resetImage: () => void }>(null);
  const { dataUser } = useContext(DataUserContext);

  const initialValues: FormValueProps = {
    matricule: "99999",
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
    formData.append("matricule", data.matricule);
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
        actions.resetForm();
        if (cameraRef.current) {
          cameraRef.current.resetImage();
        }
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: "L'étudiant à bien été inscrit",
        });
      } else if (res.data.Status === "erreurConnexionBD") {
        Toast.show({
          type: "info",
          text1: "Attention",
          text2: "Verifier votre connexion internet !",
        });
      } else if (res.data.Status === "duplication") {
        Toast.show({
          type: "error",
          text1: "Erreur lors de l'enregistrement",
          text2: "L'adresse e-mail ou le matricule existe déjà",
        });
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <>
      {/* <ScrollView> */}
      {/* <View className="flex flex-row items-center justify-between bg-gray-500/40 border-b-2 shadow-sm border-gray-500 p-4">
          <Text className="text-2xl text-center">Ajouter un participant</Text>
        </View> */}
      <Container className="pt-4 mt-10">
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
                hidden
                label="Matricule"
                placeholder=""
                onChangeText={handleChange("matricule")}
                onBlur={handleBlur("matricule")}
                value={values.matricule}
                error={touched.matricule && errors.matricule}
                touched={!!touched.matricule}
              />

              <CustomTextInput
                label="Nom"
                placeholder=""
                onChangeText={handleChange("nom")}
                onBlur={handleBlur("nom")}
                value={values.nom}
                error={touched.nom && errors.nom}
                touched={!!touched.nom}
              />

              <CustomTextInput
                label="Prénom"
                placeholder=""
                onChangeText={handleChange("prenom")}
                onBlur={handleBlur("prenom")}
                value={values.prenom}
                error={touched.prenom && errors.prenom}
                touched={!!touched.prenom}
              />

              <CustomTextInput
                label="Email"
                placeholder=""
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email && errors.email}
                touched={!!touched.email}
              />

              <CustomTextInput
                label="Niveau"
                placeholder=""
                onChangeText={handleChange("niveau")}
                onBlur={handleBlur("niveau")}
                value={values.niveau}
                error={touched.niveau && errors.niveau}
                touched={!!touched.niveau}
                hidden
              />

              <CustomTextInput
                label="Parcours"
                placeholder=""
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
      {/* </ScrollView> */}
    </>
  );
}
