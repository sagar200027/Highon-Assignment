import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CameraIcon from "./images/CameraIcon.svg";
import GalleryIcon from "./images/GalleryIcon.svg";
import BackIcon from "./images/BackIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const SelectPhoto = () => {
  const navigation = useNavigation();

  const pickImageFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log('selected photo',result);

    if (!result.canceled) {
      navigation.navigate("CreatePostScreen", {
        image: result.assets[0].uri,
        type: "image",
      });
    }
  };
  const pickImageFromCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log('selected photo',result);

    if (!result.canceled) {
      navigation.navigate("CreatePostScreen", {
        image: result.assets[0].uri,
        type: "image",
      });
    }
  };
  const pickVideoFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    const { uri } = result;
    const response = await fetch(uri);
    const VideoBlob = await response.blob();
    console.log("selected photo", result?.assets?.[0]?.uri);

    if (!result.canceled) {
      navigation.navigate("CreatePostScreen", {
        image: result.assets[0].uri,
        type: "video",
      });
    }
  };

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{ paddingLeft: 20, paddingVertical: 20 }}
      >
        <BackIcon />
      </Pressable>

      <View style={{ width: "90%", alignSelf: "center" }}>
        <Pressable
          onPress={pickImageFromGallery}
          style={styles.pickFromContainer}
        >
          <GalleryIcon />
          <Text style={styles.pickPhotoText}>Pick image from gallery</Text>
        </Pressable>
        <View
          style={{
            height: 1,
            marginVertical: 15,
            width: "100%",
            backgroundColor: "grey",
          }}
        />
        <Pressable
          onPress={pickImageFromCamera}
          style={[styles.pickFromContainer]}
        >
          <CameraIcon />
          <Text style={styles.pickPhotoText}>Capture with camera</Text>
        </Pressable>
        <View
          style={{
            height: 1,
            marginVertical: 15,
            width: "100%",
            backgroundColor: "grey",
          }}
        />
        <Pressable
          onPress={pickVideoFromGallery}
          style={[styles.pickFromContainer]}
        >
          <Icon name="video-plus" size={37} />
          <Text style={styles.pickPhotoText}>Pick video from gallery</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SelectPhoto;

const styles = StyleSheet.create({
  pickFromContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  pickPhotoText: {
    fontWeight: "500",
    marginLeft: 20,
    fontSize: 17,
  },
});
