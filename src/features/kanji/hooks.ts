/* eslint-disable no-console */
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export interface Kanji {
  exampleSentences: string;
  exampleWords: string;
  id: string;
  kanji: string;
  kanjiRating: number;
  kunReading: string;
  meanings: string;
  onReading: string;
  username: string;
}

export interface AddKanjiRequest {
  kanji: string;
  exampleWords: string;
  exampleSentences: string;
  meanings: string;
  onReading: string;
  kunReading: string;
  kanjiRating: number;
  username: string;
}

interface UpdateKanjiRequest extends AddKanjiRequest {
  id: string;
}

interface DeleteResponse {
  id: string;
}

const KANJI_URL = "http://localhost:3000/api/kanji";

async function fetchAllKanji() {
  const { data } = await axios.get(KANJI_URL);
  return data;
}

export function useAllKanji() {
  const { data, status } = useQuery<Kanji[]>(["kanjiAll"], () =>
    fetchAllKanji(),
  );
  return { data: data || [], status };
}

export function useAddKanji() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<Kanji, AddKanjiRequest>,
    unknown,
    AddKanjiRequest
  >({
    mutationFn: (newKanji) => {
      return axios.post(KANJI_URL, newKanji);
    },
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData<Kanji[]>(["kanjiAll"], (oldData) => [
        ...oldData,
        data,
      ]);
    },
  });
  return mutation;
}

export function useDeleteKanji() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<DeleteResponse, string>,
    unknown,
    string
  >({
    mutationFn: (kanjiId) => {
      return axios.delete(`${KANJI_URL}/${kanjiId}`);
    },
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData(["kanjiAll"], (oldData: Kanji[]) =>
        oldData.filter((d) => d.id !== data.id),
      );
    },
  });

  return mutation;
}

export function useUpdateKanji() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<Kanji, string>,
    unknown,
    UpdateKanjiRequest
  >((newKanji) => axios.patch(KANJI_URL, newKanji), {
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData(["kanjiAll"], (oldData: Kanji[]) => {
        const updated = oldData.map((kanji) =>
          kanji.id === data.id ? data : kanji,
        );

        return updated;
      });
    },
  });

  return mutation;
}
