import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "../components/Modal";

const CreateIssue = () => {
  const categories = [
    {
      id: 1,
      subject: "Bathroom and kitchen",
      description: "Issues related to kitchen appliances and utensils.",
    },
    {
      id: 2,
      subject: "Pests",
      description: "Problems concerning bathroom fixtures and plumbing.",
    },
    {
      id: 3,
      subject: "Hard white goods",
      description: "Electrical malfunctions and power-related issues.",
    },
    {
      id: 4,
      subject: "Doorphone and Keys/Tokens",
      description: "Matters pertaining to the outdoor garden area.",
    },
    {
      id: 5,
      subject: "Radiators Doors and windows",
      description: "Problems with washing machine or laundry-related concerns.",
    },
    {
      id: 6,
      subject: "Other things",
      description: "Problems with washing machine or laundry-related concerns.",
    },
  ];

  const windowWidth = Dimensions.get("window").width;
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  const [visibleModal, setVisibleModal] = React.useState(false);

  const handleSetCategory = (index: number) => {
    setSelectedCategory(categories[index]);
    setVisibleModal(true);
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flexWrap: "wrap",
        backgroundColor: "#0d1b2a",
      }}
    >
      {categories.map((category, index) => {
        return (
          <TouchableOpacity onPress={() => handleSetCategory(index)}>
            <View
              key={`cat ${index}}`}
              style={{
                width: windowWidth / 3 - 2,
                margin: 1,
                height: 135,
                borderRadius: 5,
                backgroundColor: "#1b263b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
              }}
            >
              <Text
                style={{
                  color: "#e0e1dd",
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {category.subject.substring(0, 10)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {visibleModal && (
        <Modal
          id={selectedCategory.id}
          subject={selectedCategory.subject}
          description={selectedCategory.description}
        />
      )}
    </View>
  );
};

export default CreateIssue;
