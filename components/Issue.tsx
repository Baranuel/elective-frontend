import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  ProblemEntity,
  ProblemEntityDto,
} from "../features/problems/problemEntity";
import { AntDesign } from "@expo/vector-icons";
import { useDeleteProblem } from "../features/problems/problems-hooks";
import Modal from "./Modal";

interface Props {
  problem: ProblemEntityDto;
  handleSelectProblem: (problem: ProblemEntityDto) => void;
}

const Issue = ({ problem, handleSelectProblem }: Props) => {
  const { mutate: deleteProblem, isLoading, isSuccess } = useDeleteProblem();
  return (
    <TouchableOpacity
      onPress={() => handleSelectProblem(problem)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        gap: 4,
        justifyContent: "space-between",
        borderRadius: 4,
        marginHorizontal: 12,
        marginVertical: 4,
        height: 84,
        padding: 12,
        backgroundColor: "white",
      }}
      key={problem?.id}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
        {problem.imageUrl.map((url: string) => {
          return (
            <Image
              key={url}
              style={{ width: 48, height: 48, borderRadius: 4 }}
              source={{ uri: url }}
            />
          );
        })}
      </View>
      <Text style={{ color: "#333" }}>{problem?.subject}</Text>
      <AntDesign
        onPress={() => {
          deleteProblem(problem?.id ?? 0);
        }}
        name="delete"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default Issue;
