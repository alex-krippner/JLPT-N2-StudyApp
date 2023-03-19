/* eslint-disable no-console */
import { KanjiCardData, KanjiResponse } from "../hooks";

export function convertKanjiResponse(
  response: KanjiResponse[],
): KanjiCardData[] {
  if (response === null) {
    console.error("Kanji response is null");
    return;
  }

  if (response === undefined) {
    console.warn("Kanji response is undefined");
    return [];
  }

  // FIXME: If exampleWords can be null or undefined than correct typing. Or ensure that they are not null
  return response.map((k) => ({
    id: k.id,
    kanji: k.kanji,
    kanjiRating: k.kanjiRating,
    exampleWords: k.exampleWords.exampleWord,
    exampleSentences: k.exampleSentences.exampleSentence,
    kunReading: k.kunReading,
    meanings: k.meanings?.map((m) => m.meaning) || [],
    onReading: k.onReading,
  }));
}
