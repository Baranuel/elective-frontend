import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProblemEntity, ProblemEntityDto } from "./problemEntity";
import { IP_ADDRESS } from "../../helpers/ipconfig";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function useGetProblems() {
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );

  const fetchProblems = async () => {
    const problems: AxiosResponse<ProblemEntityDto[]> = await axios.get(
      "http://" + IP_ADDRESS + ":3003/problems",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return problems;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });
  return { isLoading, isError, data: data?.data, error };
}

export const useCreateProblem = () => {
  const queryClient = useQueryClient();
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (newProblem: ProblemEntity) => {
      const { subject, description, category, photos } = newProblem;
      let formData = new FormData();
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("category", category.toString());

      if (photos.length > 1) {
        photos.map(async (img) => {
          let splitURI = img.split("/");
          let fileName = splitURI[splitURI.length - 1];

          const file = {
            uri: img,
            name: fileName,
            type: "image/jpeg",
          };

          // @ts-ignore
          formData.append("photo", file);
        });
      } else {
        let splitURI = photos[0].split("/");
        let fileName = splitURI[splitURI.length - 1];

        const file = {
          uri: photos[0],
          name: fileName,
          type: "image/jpeg",
        };

        // @ts-ignore
        formData.append("photo", file);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.post(
        "http://" + IP_ADDRESS + ":3003/problems",
        formData,
        config
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  return { isLoading, isSuccess, mutate };
};

export const useDeleteProblem = () => {
  const queryClient = useQueryClient();
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: (id: number) => {
      return axios.delete("http://" + IP_ADDRESS + ":3003/problems/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });
  return { isLoading, isSuccess, mutate };
};

export const useEditProblem = () => {
  const queryClient = useQueryClient();
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );

  const { isLoading, mutate, isSuccess } = useMutation({
    mutationFn: async (updatedProblem: ProblemEntity) => {
      const { id, subject, description, category, photos } = updatedProblem;
      console.log("running edit", photos);

      let formData = new FormData();
      formData.append("subject", subject);
      formData.append("description", description);
      formData.append("category", category.toString());

      if (photos.length > 0) {
        photos.map(async (img) => {
          let splitURI = img.split("/");
          let fileName = splitURI[splitURI.length - 1];

          const file = {
            uri: img,
            name: fileName,
            type: "image/jpeg",
          };

          // @ts-ignore
          formData.append("photo", file);
        });
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        "http://" + IP_ADDRESS + ":3003/problems/" + updatedProblem.id,
        formData,
        config
      );
      return response;
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  return { isLoading, isSuccess, mutate };
};

export const useGetAllProblemsAdmin = () => {
  const token: string | undefined | null = useSelector(
    (state: RootState) => state.users.token
  );
  console.log("token for problems api", token);

  const fetchProblems = async () => {
    const problems: AxiosResponse<ProblemEntity[]> = await axios.get(
      "http://" + IP_ADDRESS + ":3003/problems/admin/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return problems;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["all-problems"],
    queryFn: fetchProblems,
  });
  return { isLoading, isError, data: data?.data, error };
};
