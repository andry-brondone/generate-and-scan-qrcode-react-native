import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { url } from "../../utils/url";

interface Props {
  niveau: string;
}

interface CountProps {
  nbL1: number;
  nbL2: number;
  nbL3: number;
  nbM1: number;
  nbM2: number;
}

export default function Diagramme({ niveau }: Props) {
  const [count, setCount] = useState<CountProps>();

  useEffect(() => {
    if (niveau === "Graphe") {
      axios.get(`${url}/personne/count`).then((res) => {
        setCount(res.data);
      });
    }
  }, [niveau]);

  const data = [
    {
      name: "L1",
      population: count?.nbL1,
      color: "#f00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "L2",
      population: count?.nbL2,
      color: "#0f0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "L3",
      population: count?.nbL3,
      color: "#00f",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "M1",
      population: count?.nbM1,
      color: "#ff0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "M2",
      population: count?.nbM2,
      color: "#0ff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
