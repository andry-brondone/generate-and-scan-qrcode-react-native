import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { ScrollView, Text, View } from "react-native";
import ButtonCustom from "../components/button/ButtonCustom";
import Container from "../components/container/Container";
import CustomPicker from "../components/form/CustomPicker";
import CustomTextInput from "../components/form/CustomTextInput";
import { FormValueProps } from "../lib/FormValueProps";
import {
  niveauOptions,
  parcoursOptions,
  StatutOptions,
} from "../utils/PickerOptions";
import { validationSchemaStaff } from "../utils/ValidationSchemasYup";
import { url } from "../utils/url";

const initialValues: FormValueProps = {
  nom: "",
  prenom: "",
  email: "",
  mdp: "",
  niveau: "",
  parcours: "",
  photo: "",
  statut: "",
};

const onSubmit = (
  data: FormValueProps,
  actions: FormikHelpers<FormValueProps>
) => {
  axios
    .post(`${url}/personne/add-staff`, data)
    .then((res) => {
      if (res.data.Status === "Success") {
        console.log("ok");

        // Pour effacer les champs dans le formulaire
        actions.resetForm();
      } else if (res.data.Status === "erreurConnexionBD") {
        console.log("Verifier votre connexion internet");
      } else if (res.data.Status === "duplication") {
        console.log("Cette adresse e-mail existe déjà");
      }
    })
    .catch((error) => {
      console.error("Error : ", error);
    });
};

export default function RegisterStaffScreen() {
  return (
    <>
      <View className="flex flex-row items-center justify-between bg-gray-500/40 border-b-2 shadow-sm border-gray-500 p-4">
        <Text className="text-2xl text-center">Ajouter un staff</Text>
      </View>
      <ScrollView>
        <Container className="pt-4">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchemaStaff}
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
                  label="Mot de passe par defaut"
                  placeholder="ex. 123456"
                  onChangeText={handleChange("mdp")}
                  onBlur={handleBlur("mdp")}
                  value={values.mdp}
                  error={touched.mdp && errors.mdp}
                  touched={!!touched.mdp}
                />

                <CustomPicker
                  label="Niveau"
                  options={niveauOptions}
                  selectedValue={values.niveau}
                  onSelectChange={(value: any) =>
                    setFieldValue("niveau", value)
                  }
                  error={touched.niveau && errors.niveau}
                  touched={!!touched.niveau}
                />

                <CustomPicker
                  label="Parcours"
                  options={parcoursOptions}
                  selectedValue={values.parcours}
                  onSelectChange={(value: any) =>
                    setFieldValue("parcours", value)
                  }
                  error={touched.parcours && errors.parcours}
                  touched={!!touched.parcours}
                />

                <CustomPicker
                  label="Statut"
                  options={StatutOptions}
                  selectedValue={values.statut}
                  onSelectChange={(value: any) =>
                    setFieldValue("statut", value)
                  }
                  error={touched.statut && errors.statut}
                  touched={!!touched.statut}
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
