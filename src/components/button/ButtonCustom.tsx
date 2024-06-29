import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  variant?: "accent" | "secondary" | "outline" | "disabled";
  className?: string;
}

function ButtonCustom({
  onPress,
  title,
  variant = "accent",
  className,
}: Props) {
  let variantStyle: string = "";

  switch (variant) {
    case "accent": // default
      variantStyle =
        "bg-primary p-3 text-center rounded text-lg text-white shadow-sm";
      break;

    case "secondary":
      variantStyle =
        "text-primary border border-primary p-3 text-center rounded text-lg";
      break;

    case "outline":
      variantStyle =
        "bg-white p-3 text-center text-lg border border-gray-600 text-gray-900 rounded";
      break;

    case "disabled":
      variantStyle =
        "bg-gray-500 p-3 text-center text-lg border border-gray-500 text-gray-600 rounded dark:bg-gray-700 dark:border-gray-600/20 dark:text-white/50";
      break;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text className={`${variantStyle} ${className}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonCustom;
