import React from "react";
import { View } from "react-native";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: Props) {
  return <View className={`py-8 px-4 ${className}`}>{children}</View>;
}

export default Container;
