import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CameraIcon from "./images/CameraIcon.svg";
import GalleryIcon from "./images/GalleryIcon.svg";
import BackIcon from "./images/BackIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const SelectPhoto = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const pickImageFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('selected photo',result);
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      navigation.navigate("CreatePostScreen", { image: result.assets[0].uri });
    }
  };
  const pickImageFromCamera = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log('selected photo',result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      navigation.navigate("CreatePostScreen", { image: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView>
      <View style={{ paddingVertical: 20 }}>
        <BackIcon />
      </View>

      <View style={{ width: "90%", alignSelf: "center" }}>
        <Pressable
          onPress={pickImageFromGallery}
          style={styles.pickFromContainer}
        >
          <GalleryIcon />
          <Text style={styles.pickPhotoText}>Pick from gallery</Text>
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
