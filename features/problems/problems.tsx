import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";

import useGetProblems, {
  useCreateProblem,
  useDeleteProblem,
} from "./problems-hooks";
import { useQueryClient } from "@tanstack/react-query";
import Issue from "../../components/Issue";
import ListOfIssues from "../../components/ListOfIssues";

export function Problems() {
  const { data } = useGetProblems();

  return <ListOfIssues data={data} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
