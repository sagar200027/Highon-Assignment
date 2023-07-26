import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import BackIcon from "./images/BackIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import VibeTag from "./components/VibeTag";

const primaryColor = "#0198C6";
// const tags = [
//   {
//     icon: <Icon name="camera-alt" size={17} />,
//     text: "Photography",
//   },
//   {
//     icon: <Icon name="fastfood" size={15} />,
//     text: ,
//   },
//   {
//     icon: <Icon name="videogame-asset" size={18} />,
//     text: ,
//   },
// ];

const CreatePostScreen = (props) => {
  const image = props?.route?.params?.image;
  const [selectedTag, setSelectedTag] = useState("");
  console.log("image", props);

  const handleUpload = () => {};

  const renderItem = ({ index }) => {
    switch (index) {
      case 0: {
        return (
          <View>
            <Text
              style={[
                styles.titles,
                {
                  fontSize: 16,
                  fontWeight: "700",
                  marginTop: 10,
                  marginBottom: 5,
                },
              ]}
            >
              Description
            </Text>
            <View style={{ height: 100 }}>
              <TextInput multiline={true} style={styles.descInputStyle} />
            </View>
          </View>
        );
      }
      case 1: {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon1 name="tag" color={primaryColor} size={20} />
              <Text style={[styles.titles, { marginLeft: 10 }]}>
                Tag People
              </Text>
            </View>
            <Icon name="keyboard-arrow-right" size={30} />
          </View>
        );
      }
      case 2: {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="location-on" color={primaryColor} size={26} />
              <Text style={[styles.titles, { marginLeft: 8 }]}>Location</Text>
            </View>
            <Icon name="keyboard-arrow-right" size={30} />
          </View>
        );
      }
      case 3: {
        return (
          <View>
            <Text style={{ color: "#7B7B7B", fontWeight: "700" }}>
              Add your vibetags
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <VibeTag
                Icon={
                  <Icon
                    name="camera-alt"
                    color={selectedTag == "Photography" ? "white" : "black"}
                    size={17}
                  />
                }
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                text={"Photography"}
              />
              <VibeTag
                Icon={
                  <Icon
                    name="fastfood"
                    color={selectedTag == "Food vlogs" ? "white" : "black"}
                    size={15}
                  />
                }
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                text={"Food vlogs"}
              />
              <VibeTag
                Icon={
                  <Icon
                    name="videogame-asset"
                    color={selectedTag == "Gaming" ? "white" : "black"}
                    size={18}
                  />
                }
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                text={"Gaming"}
              />
            </View>
          </View>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
          <Icon name="arrow-back" size={27} />
        </Pressable>
        <TouchableOpacity style={styles.postTextContainer}>
          <Text style={{ color: "white" }} onPress={handleUpload}>
            Post
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{}}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              marginTop: 50,
              height: 100,
              borderRadius: 10,
            }}
          />
        )}
      </View>

      <FlatList
        data={[0, 1, 2, 3]}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: "100%",
                backgroundColor: "#707070",
                opacity: 0.1,
                height: 2,
                marginVertical: 15,
              }}
            />
          );
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingVertical: 20,
  },
  postTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00B2E8",
    borderRadius: 30,
    padding: 0,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  descInputStyle: {
    borderColor: "#0198C6",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    // height:100,
    // width:100
    flex: 1,
  },
  titles: {
    color: "#0198C6",
    fontWeight: "700",
  },
});
