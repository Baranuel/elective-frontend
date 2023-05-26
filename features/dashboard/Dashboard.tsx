import { View, Text, Dimensions, ScrollView, Image } from "react-native";
import { BarChart } from "react-native-chart-kit";
import React, { useEffect } from "react";
import {
  useDeleteProblem,
  useGetAllProblemsAdmin,
} from "../problems/problems-hooks";
import { countOccurrences } from "../../helpers/format-graph-data";
import { AntDesign } from "@expo/vector-icons";

const Dashboard = () => {
  const { data } = useGetAllProblemsAdmin();
  const { mutate: deleteProblem, isLoading, isSuccess } = useDeleteProblem();
  const labels: string[] = data?.map((problem: any) => {
    const label: string = problem?.category.category || "";
    return label;
  }) || [""];

  const dataSet = countOccurrences(data, labels);
  const formatedLabels = labels.map((label) => label.substring(0, 6));
  const uniqueLabels = [...new Set(formatedLabels)];

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ alignSelf: "flex-start", fontSize: 22, marginTop: 4 }}>
        Overview of reported issues
      </Text>
      <BarChart
        data={{
          labels: uniqueLabels,
          datasets: [
            {
              data: dataSet.map((data) => data),
            },
          ],
        }}
        width={Dimensions.get("window").width - 2} // from react-native
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={0} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#0d1b2a",
          backgroundGradientFrom: "#0d1b2a",
          backgroundGradientTo: "#364F69",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labels: ["Bathroom & K.", "Pests", "Appliances", "Keys/tags"],
          style: {
            borderRadius: 8,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: "#7A91A9",
          },
        }}
        style={{
          padding: 2,
          borderRadius: 8,
        }}
      />

      <ScrollView
        style={{ width: "100%", height: Dimensions.get("window").height / 2 }}
      >
        {data?.map((problem: any) => (
          <View
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
              backgroundColor: isLoading ? "grey" : "white",
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
                deleteProblem(problem.id);
              }}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
