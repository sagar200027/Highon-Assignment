import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AddPost from "../images/AddPost.svg";
import Icon from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";

const HeaderHome = ({ setModalVisible, posts }) => {
  const navigation = useNavigation();
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 20 }}>Highon</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AddPost />
        </TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate("Gallery", { posts: posts })}
        >
          <Icon name="search" style={{ marginLeft: 20 }} size={23} />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({});
