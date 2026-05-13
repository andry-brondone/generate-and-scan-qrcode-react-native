import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { url } from "../../utils/url";
import Container from "../container/Container";

interface Props {
  niveau: string;
}

export default function Historique({ niveau }: Props) {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    if (niveau === "Historique des scannes") {
      axios.get(`${url}/personne/historique`).then((res) => {
        setHistorique(res.data);
      });
    }
  }, [niveau]);

  return (
    <Container className="py-2">
      {historique.length > 0 ? (
        <FlatList
          data={historique}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => {
            return (
              <View className="bg-white p-5 my-2 rounded shadow-md">
                <Text className="text-lg text-gray-700">
                  Matricule :{" "}
                  <Text className="text-gray">{item.matricule}</Text>
                </Text>
                <Text className="text-lg text-gray-700">
                  Nom :{" "}
                  <Text className="text-gray">
                    {item.nom} {item.prenom}
                  </Text>
                </Text>
                <Text className="text-lg text-gray-700">
                  Classe :{" "}
                  <Text className="text-gray">
                    {item.niveau} {item.parcours}
                  </Text>
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <Text className="text-2xl text-center my-10">
          Aucune données disponnible
        </Text>
      )}
    </Container>
  );
}
