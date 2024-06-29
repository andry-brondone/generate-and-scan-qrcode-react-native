import { useContext } from "react";
import { ImageBackground, Text, View } from "react-native";
import { AnimatedHeaderSroll } from "../components/animated-header-scroll/AnimatedHeaderSroll";
import ButtonCustom from "../components/button/ButtonCustom";
import Container from "../components/container/Container";
import { DataUserContext } from "../context/DataUserContext";

function LandingScreen({ navigation }: any) {
  const Img1 = require("../../assets/1.jpg");
  const { dataUser } = useContext(DataUserContext);

  return (
    <>
      <AnimatedHeaderSroll>
        <ImageBackground source={Img1} blurRadius={10}>
          <Container className="bg-white/60 flex flex-col gap-4">
            <View>
              <Text className="text-5xl font-bold text-gray-900 text-center">
                Récéption
              </Text>
              <Text className="text-4xl text-gray-900 text-center">
                des novices 2025
              </Text>
            </View>
            <Text className="text-center text-xl my-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              sapiente aliquid. Minus rerum aspernatur perspiciatis est illo!
              Quas voluptates nemo quibusdam?
            </Text>
            <View className="flex items-center justify-center">
              {dataUser.statut === "organisateur" && (
                <ButtonCustom
                  variant="outline"
                  onPress={() => navigation.navigate("RegisterStaff")}
                  title="RgisterStaffscreen"
                  className="w-[150px]"
                />
              )}
              {dataUser.statut === "délégué" && (
                <ButtonCustom
                  variant="outline"
                  onPress={() => navigation.navigate("RegisterParticipant")}
                  title="RgisterParticipantscreen"
                  className="w-[150px]"
                />
              )}
            </View>
          </Container>
        </ImageBackground>
      </AnimatedHeaderSroll>
    </>
  );
}

export default LandingScreen;
