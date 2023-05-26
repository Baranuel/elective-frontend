import axios from "axios";
import { Platform } from "react-native";
import { ProblemEntity } from "./problemEntity";
import { IP_ADDRESS } from "../../helpers/ipconfig";

export class ProblemsAPI {
  static async create(problem: ProblemEntity, state: any) {
    try {
      const token = state["users"].token;
      console.log("token from state", token);
      const formData = new FormData();
      formData.append("subject", problem.subject);
      formData.append("description", problem.description);
      formData.append("category", "3");
      formData.append("photo", problem.photo);
      console.log("formdata", formData);

      const result = await axios.get(
        "http://" + IP_ADDRESS + ":3003/problems",
        {
          // body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${token}`,
          },
        }
      );

      console.log("IMPORTANT", result);
      return result.data;
    } catch (error) {
      console.log("error from create problem", error);
    }
  }

  static async fetchAllProblems() {
    try {
      const result = await axios.get("http://" + IP_ADDRESS + ":3003/problems");
      console.log(result);

      return result.data;
    } catch (error) {
      console.log("error", error);
    }
  }
}
