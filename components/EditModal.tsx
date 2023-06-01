import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProblemEntityDto } from "../features/problems/problemEntity";
import { useEditProblem } from "../features/problems/problems-hooks";
import * as ImagePicker from "expo-image-picker";

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
  const [image, setImage] = useState<any[]>([]);

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

  const handleSubmit = async () => {
    editProblem({
      id: id,
      subject: input1,
      description: input2,
      category: category.id,
      photos: image,
    });
  };

  const uploadImage = async () => {
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
          onChangeText={handleInput2Change}
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
