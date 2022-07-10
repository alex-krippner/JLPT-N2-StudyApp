import { KanjiCardData, KanjiResponse } from "../hooks";

export function convertKanjiResponse(
  response: KanjiResponse[],
): KanjiCardData[] {
  if (response === null) {
    console.error("Kanji response is null");
    return;
  }

  if (response === undefined) {
    console.error("Kanji response is undefined");
    return [];
  }

  return response.map((k) => ({
    id: k.id,
    kanji: k.kanji,
    kanjiRating: k.kanjiRating,
    exampleWords: k.exampleWords.map((e) => e.exampleWord),
    exampleSentences: k.exampleSentences.map((e) => e.exampleSentence),
    kunReading: k.kunReading,
    meanings: k.meanings?.map((m) => m.meaning) || [],
    onReading: k.onReading,
  }));
}
