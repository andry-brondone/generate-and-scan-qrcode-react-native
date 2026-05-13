import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Container from "../container/Container";
import Historique from "./Historique";
import StatByNiveau from "./StatByNiveau";

const niveau = [
  "L1",
  "L2",
  "L3",
  "M1",
  "M2",
  "Historique des scannes",
  "Recette",
];
const parcours = ["IG", "GBD", "ASR", "OCC", "GID"];

export default function Statistic() {
  const [selectedNiveau, setSelectedNiveau] = useState(niveau[0]);
  const [selectedParcours, setSelectedParcours] = useState(parcours[0]);

  return (
    <SafeAreaView className="mt-5">
      <Container className="bg-white">
        <FlatList
          data={niveau}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: niveau }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedNiveau(niveau)}>
                <View
                  className="px-6 py-1 rounded-[200px] mr-4 border border-gray-500"
                  style={{
                    backgroundColor:
                      selectedNiveau === niveau ? "#17B996" : "transparent",
                  }}
                >
                  <Text
                    className="text-base"
                    style={{
                      color: selectedNiveau === niveau ? "#fff" : "#000",
                    }}
                  >
                    {niveau}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {selectedNiveau !== "Recette" &&
          selectedNiveau !== "Historique des scannes" && (
            <FlatList
              data={parcours}
              keyExtractor={(item, index) => `${item}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: parcours }) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedParcours(parcours)}
                  >
                    <View
                      className="px-5 py-1 rounded-[200px] mt-5 mr-4 border border-gray-500"
                      style={{
                        backgroundColor:
                          selectedParcours === parcours
                            ? "#17B996"
                            : "transparent",
                      }}
                    >
                      <Text
                        className="text-base"
                        style={{
                          color:
                            selectedParcours === parcours ? "#fff" : "#000",
                        }}
                      >
                        {parcours}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
      </Container>

      {selectedNiveau === "Historique des scannes" ? (
        <Historique niveau={selectedNiveau} />
      ) : (
        <StatByNiveau niveau={selectedNiveau} parcours={selectedParcours} />
      )}
    </SafeAreaView>
  );
}
