import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const VibeTag = ({ Icon, text, selectedTag, setSelectedTag }) => {
  const isSelected = selectedTag == text ? true : false;
  return (
    <TouchableOpacity
      onPress={() => {
        if (selectedTag == text) {
          setSelectedTag("");
        } else {
          setSelectedTag(text);
        }
      }}
      style={{
        flexDirection: "row",
        borderRadius: 20,
        padding: 8,
        backgroundColor: selectedTag == text ? "#02BDF6" : "transparent",
        borderColor: "#02BDF5",
        borderWidth: 1,
      }}
    >
      {Icon}
      <Text
        style={{
          fontSize: 12,
          marginLeft: 3,
          color: isSelected ? "white" : "black",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default VibeTag;

const styles = StyleSheet.create({});
