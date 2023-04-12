/* eslint-disable no-console */
import { generateReactSVGs } from "@mon/tools";
import path from "path";

const foo = path.resolve(__dirname, "..", "assets");
console.log("🚀 ~ file: generateAssets.ts:6 ~ foo:", foo);

async function execute() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await generateReactSVGs({
    inputDir: foo,
    outputDir: "src/gen",
    primaryColor: "#424242",
    secondaryColor: "#000000",
  });
}
execute().catch((e) => console.error(e));
