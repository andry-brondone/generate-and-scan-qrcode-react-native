import clsx from "clsx";
import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface CustomTextInputProps {
  label?: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  value: string | undefined;
  error?: string | false | undefined;
  touched: boolean | undefined;
  secureTextEntry?: boolean;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: any;
  autoCorrect?: boolean;
  hidden?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  onChangeText,
  onBlur,
  value,
  error,
  touched,
  placeholder,
  secureTextEntry,
  keyboardType,
  textContentType,
  autoCorrect,
  hidden,
}) => {
  return (
    <View className={clsx(hidden && "hidden")}>
      <Text className="text-lg mb-1 mt-0.5">
        {label}
        <Text className=" text-alert-danger"> *</Text>
      </Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={autoCorrect}
        autoComplete="off"
        textContentType={textContentType}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        className={clsx(
          "border text-base p-3 rounded-lg border-gray-600/50 bg-white text-gray-800",
          touched && error && "border-alert-danger/50"
        )}
      />
      <View className="h-5">
        {touched && error && (
          <Text className="text-alert-danger/90">{error}</Text>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
