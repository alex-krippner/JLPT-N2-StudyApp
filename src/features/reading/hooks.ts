import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export interface Reading {
  id: string;
  japanese: string;
  translation: string;
  title: string;
}

export type AddReadingRequest = Omit<Reading, "id">;

const READING_URL = "http://localhost:3000/api/reading";

export function useAllReading() {
  const { data, status } = useQuery<Reading[]>(["readingAll"], async () => {
    const response = await axios.get<Reading[]>(READING_URL);
    return response.data;
  });

  return { data: data || [], status };
}

export function useAddReading() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<Reading, AddReadingRequest>,
    unknown,
    AddReadingRequest
  >({
    mutationFn: (newReading) => axios.post(READING_URL, newReading),
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData<Reading[]>(["readingAll"], (oldData) => [
        ...oldData,
        data,
      ]);
    },
  });

  return mutation;
}

export function useUpdateReading() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<Reading, Reading>,
    unknown,
    Reading
  >((newReading) => axios.patch(READING_URL, newReading), {
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData(["readingAll"], (oldData: Reading[]) => {
        const updated = oldData.map((reading) =>
          reading.id === data.id ? data : reading,
        );
        return updated;
      });
    },
  });
  return mutation;
}
