import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import BackIcon from "./images/BackIcon.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import VibeTag from "./components/VibeTag";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { storage } from "../Config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const primaryColor = "#0198C6";
const { width, height } = Dimensions.get("window");

const CreatePostScreen = (props) => {
  const { image, type } = props?.route?.params;
  const navigation = useNavigation();
  const [selectedTag, setSelectedTag] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationDiolougOpen, setLocationDiolougOpen] = useState(false);

  const handleUpload = (downloadURL) => {
    if (!downloadURL) {
      Alert.alert("Something went wrong!");
      return;
    }
    axios
      .post("http://192.168.1.7:3001/createpost", {
        image: downloadURL,
        description: description,
        location: location,
        vibeTag: selectedTag,
        fileType: type,
      })
      // .then((res) => res.json())
      .then((res) => {
        // Alert.alert("Post uploaded successfully!");
        navigation.navigate("HomeScreen");
        console.log("frontend res", res);
      })
      .catch((error) => {
        // Alert.alert("error uploading this post");
        console.error("Error saving note:", error);
      });
    setLoading(false);
  };

  const firebaseUpload = (storageRef, blobImage, metadata) => {
    try {
      const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("firebase upload successful", downloadURL);
            handleUpload(downloadURL);
          });
        }
      );
    } catch (e) {
      console.log("firebase error", e);
      setLoading(false);
    }
  };

  const firebaseImageUpload = async () => {
    if (!(selectedTag && image)) {
      Alert.alert("something went wrong ");
      return;
    }
    setLoading(true);

    // Converting image to blob image
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // console.log("blobImage", blobImage, image);

    let filename = image?.substring(image.lastIndexOf("/") + 1);
    const metadata = {
      contentType: "image/jpeg",
    };

    // Storage refernce, folder reference, unique name of file in firebase
    const storageRef = ref(storage, "Highon/images/" + filename + Date.now());

    firebaseUpload(storageRef, blobImage, metadata);
  };

  const firebaseVideoUpload = async () => {
    if (!(selectedTag && image)) {
      Alert.alert("something went wrong ");
      return;
    }
    setLoading(true);

    // Converting video to blob video

    const response = await fetch(image);
    const VideoBlob = await response.blob();

    let filename = image?.substring(image.lastIndexOf("/") + 1);
    const metadata = {
      contentType: "video/mp4",
    };

    console.log("videoBlob", filename);
    // Storage refernce, folder reference, unique name of file in firebase
    const storageRef = ref(storage, "Highon/videos/" + filename + Date.now());
    firebaseUpload(storageRef, VideoBlob, metadata);
  };

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
              <TextInput
                onChangeText={setDescription}
                multiline={true}
                style={styles.descInputStyle}
              />
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
          <>
            <Pressable
              onPress={() => setLocationDiolougOpen((prev) => !prev)}
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
              {locationDiolougOpen ? (
                <Icon name="keyboard-arrow-down" size={30} />
              ) : (
                <Icon name="keyboard-arrow-right" size={30} />
              )}
            </Pressable>
            {locationDiolougOpen && (
              <GooglePlacesAutocomplete
                placeholder="Type your location here!"
                styles={{
                  container: {
                    flex: 1,
                    marginTop: 4,
                  },
                  textInput: {
                    fontSize: 13,
                  },
                }}
                onPress={(data, details = null) => {
                  setLocationDiolougOpen(false);
                  setLocation(details?.formatted_address);
                  // console.log(details?.formatted_address);
                }}
                fetchDetails={true}
                returnKeyType="search"
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                  key: "AIzaSyCdZX6uHPmPVdzAawWdYkhCzujiiMTU0UQ",
                  language: "en",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
              />
            )}
            <View>
              {location && <Text style={{ paddingLeft: 15 }}>{location}</Text>}
            </View>
          </>
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
    <KeyboardAvoidingView>
      <SafeAreaView style={styles.main}>
        {loading && (
          <View style={styles.activityIndicatorStyle}>
            <Text style={{ marginBottom: 10, color: "white", fontSize: 18 }}>
              Uploading your post...
            </Text>
            <ActivityIndicator size="large" />
          </View>
        )}

        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Icon name="arrow-back" size={27} />
          </Pressable>
          <TouchableOpacity style={styles.postTextContainer}>
            <Text
              style={{ color: "white" }}
              onPress={() => {
                if (type == "video") {
                  firebaseVideoUpload();
                } else {
                  firebaseImageUpload();
                }
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{}}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 90,
                marginTop: 10,
                height: 90,
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
    </KeyboardAvoidingView>
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
  activityIndicatorStyle: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
    zIndex: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
