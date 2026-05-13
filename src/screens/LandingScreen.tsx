import { Text, View } from "react-native";
import Container from "../components/container/Container";

function LandingScreen() {
  return (
    <>
      {/* <AnimatedHeaderSroll> */}
      {/* <ImageBackground source={party} resizeMode="cover" blurRadius={20}> */}
      <Container className="flex-1 items-center justify-center flex-col gap-2 pt-4">
        <View>
          <Text className="text-5xl font-bold text-center">Tiket</Text>
          <Text className="text-4xl -mt-2 text-center">d'entrée</Text>
        </View>
        <Text className="text-center text-lg my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
          sapiente aliquid. Minus rerum aspernatur perspiciatis est illo! Quas
          voluptates nemo quibusdam?
        </Text>
      </Container>
      {/* </ImageBackground> */}
      {/* <ImageBackground source={bgConfetti} className="bg-white" blurRadius={5}>
        <Text className="text-4xl font-bold text-center m-8">
          Prix du ticket
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {
              key: "L1",
              value: "L1 : 25 000 Ar",
              className:
                "text-2xl font-bold p-8 text-center bg-white/90 border-2 border-secondary text-secondary rounded shadow-md",
            },
            {
              key: "L2+",
              value: "L2+ : 10 000 Ar",
              className:
                "text-2xl font-bold p-8 text-center bg-alert-warning/90 border-2 border-alert-warning text-white rounded shadow-md",
            },
          ]}
          renderItem={({ item }) => (
            <View className="flex flex-row gap-8 px-4 mb-10">
              <Text className={item.className}>{item.value}</Text>
            </View>
          )}
        />
      </ImageBackground>
      <Text className="text-4xl font-bold text-center mt-8">Statistique</Text>
      <Statistic /> */}
      {/* </AnimatedHeaderSroll> */}
    </>
  );
}

export default LandingScreen;
