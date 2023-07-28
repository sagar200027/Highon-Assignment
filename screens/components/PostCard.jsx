import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Video } from "expo-av";

const { width, height } = Dimensions.get("window");

const PostCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const videoRef = useRef(null);
  console.log("item", item);
  return (
    <Pressable
      onPress={() => {
        if (item?.type != "video") {
          setIsModalVisible(true);
        }
      }}
      style={styles.main}
    >
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 5,
          paddingHorizontal: 10,
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
            <Text style={{ fontWeight: "700" }}>Username</Text>
            <Text style={{ fontSize: 11 }}>{item?.location}</Text>
          </View>
        </View>

        <View>
          <Icon name="options" />
        </View>
      </View>

      {/* middle image */}
      <View style={{ position: "relative" }}>
        {item?.type == "video" ? (
          <Video
            ref={videoRef}
            source={{ uri: item?.image }}
            style={{
              width: width / 1.1,
              height: height / 4,
              // resizeMode: "cover",
            }}
            resizeMode="contain"
            useNativeControls // Enable native video controls
            // shouldPlay // Autoplay when the video component is mounted
            isLooping
          />
        ) : (
          <Image
            style={{
              width: width / 1.1,
              height: height / 4,
              resizeMode: "cover",
            }}
            source={{ uri: item?.image }}
          />
        )}
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
      </View>

      {/* Bottom */}
      <View style={{ paddingVertical: 17, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", position: "relative" }}>
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
            <Image
              style={{
                width: 30,
                aspectRatio: 1,
                marginRight: 10,
                borderRadius: 25,
                right: 23,
                borderWidth: 2,
                borderColor: "white",
              }}
              source={require("../images/sagar.jpg")}
            />
            <Image
              style={{
                width: 30,
                aspectRatio: 1,
                marginRight: 10,
                borderRadius: 25,
                right: 46,
                borderWidth: 2,
                borderColor: "white",
              }}
              source={require("../images/sagar.jpg")}
            />
          </View>
          <View>
            <Text style={{ fontSize: 12, right: 40 }}>
              Akhil Reddy and 35 others emoted
            </Text>
          </View>
        </View>
        <Text style={{}}>{item?.description}</Text>
      </View>

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

export default PostCard;

const styles = StyleSheet.create({
  main: {
    borderRadius: 20,
    backgroundColor: "white",
    shadowRadius: 70,
    shadowOpacity: 1,
    shadowOffset: { width: 30, height: 30 },
    shadowColor: "black",
    elevation: 4,
    width: width / 1.1,
  },
});
