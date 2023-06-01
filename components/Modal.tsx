import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

import { useCreateProblem } from "../features/problems/problems-hooks";
import * as ImagePicker from "expo-image-picker";

import { useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  id: number;
  subject: string;
  description: string;
}

const Modal = ({ id, subject, description }: ModalProps) => {
  const { isLoading, mutate: createProblem, isSuccess } = useCreateProblem();
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
    createProblem({
      subject: input1,
      description: input2,
      category: id,
      photos: image,
    });
  };

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (result.canceled) return;

    result.assets.map((img) => {
      setImage((prev) => [...prev, img.uri]);
      return;
    });
  };

  const showImages = () => {
    return image.map((image, index) => {
      if (image.type === "cancel") return;

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
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}>
            {isLoading ? "loading" : "SUBMIT"}
          </Text>
        </TouchableOpacity>
        <Text>{isSuccess && "SUCCESS"}</Text>
      </View>
    </View>
  );
};

export default Modal;
