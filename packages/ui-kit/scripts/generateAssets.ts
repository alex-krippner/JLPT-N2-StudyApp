import { generateReactSVGs } from "@mon/mon-svg-converter";

async function execute() {
  await generateReactSVGs({
    inputDir: "assets",
    outputDir: "src/gen",
    primaryColor: "#424242",
    secondaryColor: "#000000",
  });
}

execute();
