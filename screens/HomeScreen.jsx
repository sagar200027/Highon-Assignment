import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "./components/PostCard";
import CrossButton from "./images/CrossButton.svg";
import CreatePost from "./images/CreatePost.svg";
import CreateStory from "./images/CreateStory.svg";
import HeaderHome from "./components/HeaderHome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const setUser = props?.route?.params?.setUser;

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
      axios
        .get("http://192.168.1.7:3001/postlist")
        // .then((res) => res.json())
        .then((res) => {
          // console.log("frontend res", res?.data);
          const posts = res?.data?.reverse();
          setData(posts);
        })
        .catch((error) => {
          Alert.alert("error fetching posts!");
          console.error("Error saving note:", error);
        });
      console.log("working");
    }, [])
  );

  return (
    <SafeAreaView style={styles.main}>
      <HeaderHome setModalVisible={setModalVisible} posts={data} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
              style={{ position: "absolute", right: 7, top: 7 }}
            >
              <CrossButton width={30} height={30} />
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("SelectPhoto");
              }}
            >
              <CreatePost />
              <Text style={styles.modalTextStyle}>Create a post</Text>
            </Pressable>
            <View style={{ marginVertical: 7, backgroundColor: "grey" }} />
            <Pressable style={styles.modalButton}>
              <CreateStory />
              <Text style={styles.modalTextStyle}>Create a story</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
        style={{ width: "100%", flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 10 }} />;
        }}
        renderItem={({ item, index }) => {
          // console.log("item", item);
          return (
            <View style={{ marginTop: index == 0 ? 10 : 0 }}>
              <PostCard item={item} />
            </View>
          );
        }}
      />

      <Button
        onPress={() => {
          setUser(null);
        }}
        title="Logout"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    width: width / 1.5,
    backgroundColor: "white",
    borderRadius: 20,
    position: "relative",
    // paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    alignItems: "center",
  },
  modalTextStyle: {
    textAlign: "center",
    marginLeft: 18,
  },
});
