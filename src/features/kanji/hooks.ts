/* eslint-disable no-console */
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export interface ExampleSentence {
  exampleSentence: string;
  id: string;
  kanjiId: string;
}

export interface ExampleWord {
  exampleWord: string;
  id: string;
  kanjiId: string;
}

export interface Meaning {
  kanjiId: string;
  meaning: string;
}

export interface KanjiResponse {
  exampleSentences: ExampleSentence;
  exampleWords: ExampleWord;
  id: string;
  kanji: string;
  kanjiRating: number;
  kunReading: string;
  meanings: Meaning[];
  onReading: string;
  username: string;
}

export interface KanjiCardData {
  exampleSentences: string;
  exampleWords: string;
  id: string;
  kanji: string;
  kanjiRating: number;
  kunReading: string;
  meanings: string[];
  onReading: string;
}

export interface AddKanjiRequest {
  kanji: string;
  exampleWords: Omit<ExampleWord, "id" | "kanjiId">;
  exampleSentences: Omit<ExampleSentence, "id" | "kanjiId">;
  meanings: Omit<Meaning, "kanjiId">[];
  onReading: string;
  kunReading: string;
  kanjiRating: number;
  username: string;
}

interface UpdateKanjiRequest extends AddKanjiRequest {
  id: string;
}

const KANJI_URL = "http://localhost:3000/api/kanji";

async function fetchAllKanji() {
  const { data } = await axios.get(KANJI_URL);
  return data;
}

export function useAllKanji() {
  const { data, status } = useQuery<KanjiResponse[]>(["kanjiAll"], () =>
    fetchAllKanji(),
  );
  return { data: data || [], status };
}

export function useAddKanji() {
  const mutation = useMutation<KanjiResponse[], unknown, AddKanjiRequest>({
    mutationFn: (newKanji) => {
      return axios.post(KANJI_URL, newKanji);
    },
  });
  return mutation;
}

export function useDeleteKanji() {
  const mutation = useMutation<unknown, unknown, string>({
    mutationFn: (kanjiId) => {
      return axios.delete(`${KANJI_URL}/${kanjiId}`);
    },
  });

  return mutation;
}

export function useUpdateKanji() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<KanjiResponse, string>,
    unknown,
    UpdateKanjiRequest
  >((newKanji) => axios.patch(KANJI_URL, newKanji), {
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData(["kanjiAll"], (oldData: KanjiResponse[]) => {
        return oldData.map((kanji) => (kanji.id === data.id ? data : kanji));
      });
    },
  });

  return mutation;
}
