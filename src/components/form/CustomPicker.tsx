import { Picker } from "@react-native-picker/picker";
import clsx from "clsx";
import React from "react";
import { Text, View } from "react-native";

interface CustomTextInputProps {
  label?: string;
  error?: string | false | undefined;
  touched: boolean | undefined;
  options: { label: string; value: string }[];
  onSelectChange: (value: string) => void;
  selectedValue?: string;
}

const CustomPicker: React.FC<CustomTextInputProps> = ({
  label,
  error,
  touched,
  options,
  onSelectChange,
  selectedValue,
}) => {
  return (
    <>
      <Text className="text-lg mb-1 mt-0.5">
        {label}
        <Text className=" text-alert-danger"> *</Text>
      </Text>
      <View
        className={clsx(
          "border border-gray-600/50 text-gray-800 rounded bg-white",
          touched && error && "border-alert-danger/50"
        )}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue: any) => onSelectChange(itemValue)}
        >
          {options.map((opt, index) => (
            <Picker.Item label={opt.label} value={opt.value} key={index} />
          ))}
        </Picker>
      </View>
      <View className="h-5">
        {touched && error && (
          <Text className="text-alert-danger/90">{error}</Text>
        )}
      </View>
    </>
  );
};

export default CustomPicker;
