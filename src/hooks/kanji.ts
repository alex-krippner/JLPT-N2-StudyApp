import axios from "axios";
import { useQuery } from "react-query";

type Filter = "all" | "rating";
interface Options {
  filter: Filter;
}
async function fetchAllKanji() {
  const { data } = await axios.get("http://localhost:3000/api/kanji");
  return data;
}

export function useAllKanji(options: Options) {
  const { data } = useQuery(["kanjiAll", options.filter], () =>
    fetchAllKanji(),
  );
  return data;
}
