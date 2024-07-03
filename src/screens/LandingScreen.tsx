import { ImageBackground, Text, View } from "react-native";
import { AnimatedHeaderSroll } from "../components/animated-header-scroll/AnimatedHeaderSroll";
import Container from "../components/container/Container";
import { bgConfetti, party } from "../utils/url";

function LandingScreen() {
  return (
    <>
      <AnimatedHeaderSroll>
        <ImageBackground source={party} resizeMode="cover" blurRadius={20}>
          <Container className="flex flex-col gap-2 pt-4">
            <View>
              <Text className="text-5xl font-bold text-white text-center">
                Réception
              </Text>
              <Text className="text-4xl -mt-2 text-white text-center">
                des novices 2025
              </Text>
            </View>
            <Text className="text-center text-lg my-2 text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
              sapiente aliquid. Minus rerum aspernatur perspiciatis est illo!
              Quas voluptates nemo quibusdam?
            </Text>
          </Container>
        </ImageBackground>
        <ImageBackground source={bgConfetti} blurRadius={3}>
          <View className="h-[900px] border"></View>
        </ImageBackground>
      </AnimatedHeaderSroll>
    </>
  );
}

export default LandingScreen;
