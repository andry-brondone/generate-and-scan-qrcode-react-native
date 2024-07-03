import axios from "axios";
import { Formik } from "formik";
import { useContext } from "react";
import { Text, View } from "react-native";
import * as Yup from "yup";
import { AnimatedHeaderSroll } from "../components/animated-header-scroll/AnimatedHeaderSroll";
import ButtonCustom from "../components/button/ButtonCustom";
import Container from "../components/container/Container";
import CustomTextInput from "../components/form/CustomTextInput";
import { AuthContext } from "../context/AuthContext";
import { url } from "../utils/url";

interface FormLoginProps {
  email: string;
  mdp: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email est requis"),
  mdp: Yup.string().required("Mot de passe est requis"),
});

const initialValues: FormLoginProps = {
  email: "",
  mdp: "",
};

export default function LoginScreen() {
  const { setToken } = useContext(AuthContext);

  const onSubmit = (data: FormLoginProps) => {
    axios
      .post(`${url}/personne/login`, data)
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          setToken(res.data.token);
          console.log("connecter");
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          console.log("Verifier votre connexion internet");
        }
      });
  };

  return (
    <AnimatedHeaderSroll>
      <Container>
        <Text className="text-4xl text-center mb-10 font-bold text-gray-600">
          Connexion
        </Text>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <CustomTextInput
                label="Email"
                placeholder="ex. andry.brondone@gmail.com"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email && errors.email}
                touched={!!touched.email}
              />

              <CustomTextInput
                label="Mot de passe"
                placeholder="ex. 123456"
                onChangeText={handleChange("mdp")}
                onBlur={handleBlur("mdp")}
                value={values.mdp}
                secureTextEntry
                autoCorrect={false}
                textContentType="password"
                error={touched.mdp && errors.mdp}
                touched={!!touched.mdp}
              />

              <View>
                <ButtonCustom
                  title="Se connecter"
                  onPress={() => handleSubmit()}
                  className="mt-7"
                />
              </View>
            </View>
          )}
        </Formik>
      </Container>
    </AnimatedHeaderSroll>
  );
}
