import React, { useState } from "react";
import { Grid } from "@mon-ui-kit/components";
import { useAllKanji } from "../hooks";
import KanjiCard from "./Card/KanjiCard";

type Filter = "all" | "rating";
interface Options {
  filter: Filter;
}

const KanjiView = () => {
  const [options, _] = useState<Options>({ filter: "all" });
  const { data } = useAllKanji(options);

  return (
    <Grid padding={0}>
      {data.map((d) => (
        <KanjiCard data={d} />
      ))}
    </Grid>
  );
};

export default KanjiView;
