import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createProblem } from "../features/problems/problemsSlice";
import {
  ProblemEntity,
  ProblemEntityDto,
} from "../features/problems/problemEntity";
import {
  useCreateProblem,
  useEditProblem,
} from "../features/problems/problems-hooks";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  selectedProblem: ProblemEntityDto;
  closeModal: () => void;
}

const EditModal = ({ selectedProblem, closeModal }: ModalProps) => {
  const { id, subject, description, imageUrl, category } = selectedProblem;
  const [photosToShow, setPhotosToShow] = useState<string[]>(imageUrl);
  const { isLoading, mutate: editProblem, isSuccess } = useEditProblem();
  const queryClient = useQueryClient();
  const [input1, setInput1] = useState(subject);
  const [input2, setInput2] = useState(description);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(["problems"]);
    }
  }, [isSuccess]);

  const handleInput1Change = (text: string) => {
    setInput1(text);
  };

  const handleInput2Change = (text: string) => {
    setInput2(text);
  };

  const [image, setImage] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );
  const handleSubmit = async () => {
    console.log("category", category.id);
    editProblem({
      id: id,
      subject: input1,
      description: input2,
      category: category.id,
      photos: image,
    });
  };

  const uploadImage = async () => {
    // const res = await DocumentPicker.getDocumentAsync({
    //   copyToCacheDirectory: false,
    //   type: "*/*",
    // });
    // if (res.type === "cancel") return;

    // const { uri, name, type } = res;

    // try {
    //   const fetchResponse = await fetch(uri);
    //   console.log(fetchResponse);
    //   const blob = await fetchResponse.blob();
    //   setImage((prev) => [...prev, blob]);
    //   console.log(blob);
    // } catch (err) {
    //   console.log(err);
    // }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (result.canceled) return;
    result.assets.map((img) => {
      setPhotosToShow((prev) => [...prev, img.uri]);
      setImage((prev) => [...prev, img.uri]);
      return;
    });
  };

  const showImages = () => {
    return photosToShow.map((image, index) => {
      return (
        <Image
          key={index}
          style={{
            width: 75,
            height: 75,
            resizeMode: "stretch",
            borderRadius: 8,
            borderColor: "black",
            borderWidth: 1,
          }}
          source={{ uri: image }}
        />
      );
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        transform: [{ translateX: 10 }, { translateY: 25 }],
        width: Dimensions.get("window").width - 20,
        borderRadius: 8,
        padding: 24,
        height: "90%",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity onPress={() => closeModal()}>
        <Text>Close</Text>
      </TouchableOpacity>
      <View>
        <Text>Subject</Text>
        <TextInput
          placeholder={input1}
          value={input1}
          style={{
            marginBottom: 12,
            padding: 8,
            width: "100%",
            borderColor: "black",
            borderWidth: 1,
          }}
          onChangeText={handleInput1Change}
        />
        <Text>Description</Text>
        <TextInput
          placeholder="Some details about the problem"
          value={input2}
          style={{
            marginBottom: 12,
            padding: 8,
            width: "100%",
            borderColor: "black",
            borderWidth: 1,
          }}
          onChangeText={handleInput1Change}
        />
        <View>
          <Text>Images</Text>
          <View
            style={{
              minHeight: 50,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {showImages()}
          </View>
        </View>
        <Text>Reason</Text>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 84,
            borderRadius: 8,
            padding: 6,
            backgroundColor: "#333",
          }}
          onPress={() => uploadImage()}
        >
          <Text style={{ color: "white" }}>Upload Images</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 64,
            marginTop: 64,
            borderRadius: 8,
            padding: 6,
            backgroundColor: "#444",
          }}
          onPress={() => handleSubmit()}
        >
          <Text style={{ color: "white" }}>
            {isLoading ? "loading" : "EDIT"}
          </Text>
        </TouchableOpacity>
        <Text>{isSuccess && "SUCCESS"}</Text>
      </View>
    </View>
  );
};

export default EditModal;
