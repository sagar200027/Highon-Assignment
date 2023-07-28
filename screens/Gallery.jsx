import { Modal, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import PhotoCard from "./components/PhotoCard";

const Gallery = (props) => {
  const posts = props?.route?.params?.posts;
  const images = posts?.map((item) => item?.image);
  //   console.log("posts", posts);
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 20 }}>Highon</Text>
      </View>
      <FlatList
        numColumns={2}
        data={posts}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }) => {
          return (
            <PhotoCard item={item} index={index} />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
