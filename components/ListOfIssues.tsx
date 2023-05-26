import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { ProblemEntityDto } from "../features/problems/problemEntity";
import Issue from "./Issue";
import Modal from "./Modal";
import EditModal from "./EditModal";

interface Props {
  data: ProblemEntityDto[] | undefined;
}

const ListOfIssues = ({ data }: Props) => {
  const [selectedProblem, setSelectedProblem] = useState<
    ProblemEntityDto | undefined
  >(undefined);
  const [seeModal, setSeeModal] = useState<boolean>(true);

  const handleModal = (problem: ProblemEntityDto) => {
    setSeeModal(true);
    setSelectedProblem(problem);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {data?.map((problem: any) => (
            <Issue
              handleSelectProblem={() => handleModal(problem)}
              key={problem.id}
              problem={problem}
            />
          ))}
        </ScrollView>
      </View>

      {selectedProblem && seeModal && (
        <EditModal
          selectedProblem={selectedProblem}
          closeModal={() => setSeeModal(false)}
        />
      )}
    </>
  );
};

export default ListOfIssues;
