import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const PostCard = ({ item }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.main}>
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
        <Image
          style={{
            width: width / 1.1,
            height: height / 4,
            resizeMode: "cover",
          }}
          source={{ uri: item?.image }}
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
    </View>
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
