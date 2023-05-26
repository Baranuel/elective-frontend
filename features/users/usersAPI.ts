import axios from "axios";
import { Platform } from "react-native";
import { UsersEntity } from "./usersEntity";
import { IP_ADDRESS } from "../../helpers/ipconfig";

export class UsersAPI {
  static baseUrl: string = Platform.OS === "ios" ? "localhost" : "10.0.2.2";
  static ip: string = "192.168.155.6";

  static async signup(user: UsersEntity) {
    try {
      const result = await axios.post(
        "http://" + IP_ADDRESS + ":3003/auth/signup-tenant",
        user
      );

      console.log("result", result.data);
      return result.data;
    } catch (error) {}
  }

  static async login(user: UsersEntity) {
    // try {
    const result = await axios.post(
      "http://" + IP_ADDRESS + ":3003/auth/login",
      user
    );
    console.log("result", result.data);
    return result.data;
    // }
    // catch(error: any) {
    //     // console.log("error", error.response.data);
    //     // console.log("error", error.response.status);
    //     // console.log("error", error.response.headers);

    //     if (error.response.status === 401) {

    //     }
    // }
  }
}
