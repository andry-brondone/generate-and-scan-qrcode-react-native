import { Text, View } from "react-native";
import ButtonCustom from "../button/ButtonCustom";

interface Props {
  label: string;
  navigation: any;
  navigateTo: string;
}

export const HeaderForm = ({ label, navigation, navigateTo }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between bg-gray-500/60 border-b-2 shadow-sm border-gray-500 p-4">
      <Text className="text-2xl text-center">{label}</Text>
      <ButtonCustom
        variant="secondary"
        onPress={() => navigation.navigate({ navigateTo })}
        title="Retour"
        className="py-1 px-5 text-sm"
      />
    </View>
  );
};
