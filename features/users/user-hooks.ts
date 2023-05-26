import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios, { AxiosResponse } from "axios";
import { IP_ADDRESS } from "../../helpers/ipconfig";
import { useQuery } from "@tanstack/react-query";
import { UsersEntity } from "./usersEntity";

export const useGetUser = () => {
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );

  const fetchUser = async () => {
    const user: AxiosResponse<UsersEntity> = await axios.get(
      "http://" + IP_ADDRESS + ":3003/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return user;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
  return { isLoading, isError, data: data?.data, error };
};
