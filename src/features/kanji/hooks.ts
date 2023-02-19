import axios from "axios";
import { useQuery } from "react-query";
import { convertKanjiResponse } from "./utils";

type Filter = "all" | "rating";
interface Options {
  filter: Filter;
}

interface ExampleSentence {
  exampleSentence: string;
  id: string;
  kanjiId: string;
}

interface ExampleWord {
  exampleWord: string;
  id: string;
  kanjiId: string;
}

interface Meaning {
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

async function fetchAllKanji() {
  const { data } = await axios.get("http://localhost:3000/api/kanji");
  return data;
}

export function useAllKanji(options: Options) {
  const { data, status } = useQuery(["kanjiAll", options.filter], () =>
    fetchAllKanji(),
  );
  return { data: convertKanjiResponse(data), status };
}
