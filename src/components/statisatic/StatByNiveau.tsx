import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { url } from "../../utils/url";
import Container from "../container/Container";

interface Props {
  niveau: string;
  parcours: string;
}

interface RecetteProps {
  countL1: number;
  countL2Plus: number;
}

export default function StatByNiveau({ niveau, parcours }: Props) {
  const [participant, setParticipation] = useState([]);
  const [recette, setRecette] = useState<RecetteProps>();

  useEffect(() => {
    if (niveau !== "Recette") {
      axios
        .get(`${url}/personne/byNiveau/${niveau}/${parcours}`)
        .then((res) => {
          setParticipation(res.data);
        });
    } else {
      setParticipation([]);
      axios.get(`${url}/personne/recette`).then((res) => {
        setRecette(res.data);
      });
    }
  }, [niveau, parcours]);

  if (niveau !== "Recette") {
    return (
      <Container className="py-2">
        {participant.length > 0 ? (
          <FlatList
            data={participant}
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
                    E-mail: <Text className="text-gray">{item.email}</Text>
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

  return (
    <Container className="flex flex-col items-center gap-4">
      <Text className="text-xl text-gray-700 font-extrabold">
        Nombre d'etudiant en L1 inscrit
      </Text>
      <Text className="border-2 bg-white w-full text-center py-3 rounded text-secondary-blue border-secondary-blue text-2xl">
        {recette?.countL1} Etudiants
      </Text>
      <Text className="text-xl text-gray-700 mt-3 font-extrabold">
        Nombre d'etudiant en L2 + inscrit
      </Text>
      <Text className="border-2 bg-white w-full text-center py-3 rounded text-secondary-blue border-secondary-blue text-2xl">
        {recette?.countL2Plus} Etudiants
      </Text>
      <Text className="text-xl text-gray-700 mt-3 font-extrabold">
        Recette totale
      </Text>
      <Text className="w-full text-2xl font-bold p-3 text-center bg-white/90 border-2 border-secondary text-secondary rounded">
        L1 : {Number(recette?.countL1) * 25000} Ar
      </Text>
      <Text className="w-full text-2xl font-bold p-3 text-center bg-alert-warning/90 border-2 border-alert-warning text-white rounded">
        L2+ : {Number(recette?.countL2Plus) * 10000} Ar
      </Text>
    </Container>
  );
}
