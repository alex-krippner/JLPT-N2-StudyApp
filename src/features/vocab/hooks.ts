import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface DeleteResponse {
  id: string;
}

export interface Vocab {
  id: string;
  vocab: string;
  definitions: string;
  exampleSentences: string;
  partsOfSpeech: string;
  kanji: string;
  vocabRating: number;
  username: string;
}

export type AddVocabRequest = Omit<Vocab, "id">;

const VOCAB_URL = "http://localhost:3000/api/vocab";

export function useAllVocab() {
  const { data, status } = useQuery<Vocab[]>(["vocabAll"], async () => {
    const response = await axios.get(VOCAB_URL);
    return response.data;
  });

  return { data: data || [], status };
}

export function useAddVocab() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<Vocab, AddVocabRequest>,
    unknown,
    AddVocabRequest
  >({
    mutationFn: (newVocab) => axios.post(VOCAB_URL, newVocab),
    onSuccess: (response) => {
      const { data } = response;
      queryClient.setQueryData<Vocab[]>(["vocabAll"], (oldData) => [
        ...oldData,
        data,
      ]);
    },
  });

  return mutation;
}

export function useDeleteVocab() {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    AxiosResponse<DeleteResponse, string>,
    unknown,
    string
  >({
    mutationFn: (vocabId) => axios.delete(`${VOCAB_URL}/${vocabId}`),
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["vocabAll"], (oldData: Vocab[]) =>
        oldData.filter((d) => d.id !== data.id),
      );
    },
  });

  return mutation;
}

export function useUpdateVocab() {
  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<Vocab, string>, unknown, Vocab>(
    (newVocab) => axios.patch(VOCAB_URL, newVocab),
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData(["vocabAll"], (oldData: Vocab[]) => {
          const updated = oldData.map((vocab) =>
            vocab.id === data.id ? data : vocab,
          );
          return updated;
        });
      },
    },
  );

  return mutation;
}
