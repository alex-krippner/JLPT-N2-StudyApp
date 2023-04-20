/* eslint-disable no-console */
import { generateReactSVGs } from "@mon/tools";
import path from "path";

const assetsSrc = path.resolve(__dirname, "..", "assets");

async function execute() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await generateReactSVGs({
    inputDir: assetsSrc,
    outputDir: "src/gen",
    primaryColor: "#424242",
    secondaryColor: "#000000",
  });
}
execute().catch((e) => console.error(e));
