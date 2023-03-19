/* eslint-disable no-console */
import axios from "axios";
import { useMutation, useQuery } from "react-query";

type Filter = "all" | "rating";
interface Options {
  filter: Filter;
}

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
  exampleSentences: ExampleSentence[];
  exampleWords: ExampleWord[];
  id: string;
  kanji: string;
  kanjiRating: number;
  kunReading: string;
  meanings: Meaning[];
  onReading: string;
  username: string;
}

export interface KanjiCardData {
  exampleSentences: string[];
  exampleWords: string[];
  id: string;
  kanji: string;
  kanjiRating: number;
  kunReading: string;
  meanings: string[];
  onReading: string;
}

export interface AddKanjiRequest {
  kanji: string;
  exampleWords: Omit<ExampleWord, "id" | "kanjiId">[];
  exampleSentences: Omit<ExampleSentence, "id" | "kanjiId">[];
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

export function useAllKanji(options: Options) {
  const { data, status } = useQuery<KanjiResponse[]>(
    ["kanjiAll", options.filter],
    () => fetchAllKanji(),
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
  const mutation = useMutation<KanjiResponse[], unknown, UpdateKanjiRequest>({
    mutationFn: (newKanji) => {
      return axios.patch(KANJI_URL, newKanji);
    },
  });

  return mutation;
}
