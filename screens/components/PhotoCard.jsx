import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const PhotoCard = ({ item, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log('images',images);

  return (
    <Pressable onPress={() => setIsModalVisible(true)} style={styles.main}>
      <Image
        source={{ uri: item?.image }}
        style={{
          marginLeft: index % 2 != 0 ? 5 : 0,
          marginRight: index % 2 != 0 ? 0 : 5,
          width: width / 2.3,
          height: height / 7,
          borderRadius: 10,
        }}
      />
      <Pressable
        style={{ position: "absolute", bottom: 13, right: 13 }}
        onPress={() => setIsLiked((prev) => !prev)}
      >
        {isLiked ? (
          <Icon1 name="heart" size={20} color={"red"} />
        ) : (
          <Icon1 name="heart-o" size={20} color={"white"} />
        )}
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setIsModalVisible((prev) => !prev);
        }}
      >
        <View
          style={{
            flex: 1,
            height: height,
            backgroundColor: "black",
            width: width,
            position: "relative",
            zIndex: 5,
          }}
        >
          <Image
            source={{ uri: item?.image }}
            style={{ width: width, height: height, resizeMode: "contain" }}
          />
          <Pressable
            style={{
              position: "absolute",
              zIndex: 100,
              bottom: height / 4.5,
              right: 20,
            }}
            onPress={() => setIsLiked((prev) => !prev)}
          >
            {isLiked ? (
              <Icon1 name="heart" size={24} color={"red"} />
            ) : (
              <Icon1 name="heart-o" size={24} color={"white"} />
            )}
          </Pressable>
          <Pressable
            style={{ position: "absolute", bottom: height / 6.4, right: 20 }}
          >
            <Icon2 name="share" size={30} color={"white"} />
          </Pressable>

          <View
            style={{
              zIndex: 10,
              position: "absolute",
              width: "100%",
              height: "93%",
              justifyContent: "flex-end",
              // backgroundColor: "red",
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    width: 30,
                    aspectRatio: 1,
                    marginRight: 10,
                    borderRadius: 25,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                  source={require("../images/sagar.jpg")}
                />
                <View>
                  <Text style={{ fontWeight: "700", color: "white" }}>
                    Username
                  </Text>
                  <Text style={{ fontSize: 11, color: "white" }}>
                    {item?.location}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ color: "white", marginTop: 15, paddingRight: 50 }}>
              {item?.description}
            </Text>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

export default PhotoCard;

const styles = StyleSheet.create({
  main: {
    // borderRadius:10
  },
  swiper: {
    backgroundColor: "black",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
