import { transform, Config as SvgrConfig } from "@svgr/core";
import glob from "glob-promise";
import { svgoConfig } from "./svgoConfig";
import { monSvgTemplate } from "./monSvgTemplate";
import { Names, getNames } from "./utils";
import path from "path";
import fs from "fs-extra-promise";
import { logger } from "./logger";

type PartSvgrConfig = Partial<SvgrConfig>;

interface Modifiers {
  svgModifier?: (svgCode: string, filePath: string) => string;
  jsModifier?: (jsCode: string) => string;
}

export const enum GeneratorStatus {
  Unknown = "Unknown",
  Done = "Done",
  Skipped = "Skipped",
}

interface GeneratorFeedback {
  status: GeneratorStatus;
  outputFilePath: string;
}

interface SvgGeneratorConfig {
  inputDir: string;
  outputDir: string;
  primaryColor: string;
  secondaryColor: string;
  autoPrefix: boolean;
  partSvgrConfig?: PartSvgrConfig;
  modifiers?: Modifiers;
  getNameFn?: (filePath: string) => Names;
}

interface GeneratorFeedback {
  status: GeneratorStatus;
  outputFilePath: string;
}

async function convert(
  svgCode: string,
  componentName: string,
  primaryColor: string,
  secondaryColor: string,
  autoPrefix?: boolean,
  partSvgConfig?: PartSvgrConfig
): Promise<string> {
  const svgrConfig: SvgrConfig = {
    typescript: true,
    dimensions: false,
    expandProps: true,
    prettier: process.env.NODE_ENV !== "production",
    prettierConfig: {
      tabWidth: 2,
    },
    svgo: true,
    svgoConfig: svgoConfig(componentName, autoPrefix),
    memo: true,
    template: monSvgTemplate,
    svgProps: { "aria-hidden": "true" },
    replaceAttrValues: {
      [primaryColor.toLowerCase()]: `{primaryColor || "${primaryColor}"}`,
      [primaryColor.toUpperCase()]: `{primaryColor || "${primaryColor}"}`,
      [secondaryColor.toLowerCase()]: `{secondaryColor || "${secondaryColor}"}`,
      [secondaryColor.toLowerCase()]: `{secondaryColor || "${secondaryColor}"}`,
    },
    plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
    ...partSvgConfig,
  };

  const jsCode = await transform(svgCode, svgrConfig, { componentName });

  const comment = `// !autogenerated file. This is just a placeholder and will be overwritten`;
  return comment.concat("\n\n", jsCode);
}

export async function generate(
  filePath: string,
  outputPath: string,
  primaryColor: string,
  secondaryColor: string,
  autoPrefix?: boolean,
  partSvgConfig?: PartSvgrConfig,
  modifiers?: Modifiers,
  getNamesFn?: (filePath: string) => Names
): Promise<GeneratorFeedback> {
  const getNamesImpl = getNamesFn ? getNamesFn : getNames;
  const { fileName, componentName } = getNamesImpl(filePath);
  const outputFilePath = path.join(outputPath, fileName);

  if (fs.existsSync(outputFilePath))
    return { status: GeneratorStatus.Skipped, outputFilePath };

  const svgCode = await fs.readFileAsync(filePath, "utf-8");
  const modifiedSvgCode = modifiers?.svgModifier
    ? modifiers.svgModifier(svgCode, filePath)
    : svgCode;
  const jsCode = await convert(
    modifiedSvgCode,
    componentName,
    primaryColor,
    secondaryColor,
    autoPrefix,
    partSvgConfig
  );
  const modifiedJsCode = modifiers?.jsModifier
    ? modifiers.jsModifier(jsCode)
    : jsCode;

  await fs.writeFileAsync(outputFilePath, modifiedJsCode);
  return { status: GeneratorStatus.Done, outputFilePath };
}

const defaultConfig: SvgGeneratorConfig = {
  inputDir: "assets",
  outputDir: "src/gen",
  primaryColor: "#424242",
  secondaryColor: "#000000",
  autoPrefix: true,
  getNameFn: getNames,
};

export async function generateReactSVGs(
  config: Partial<SvgGeneratorConfig> = defaultConfig
): Promise<boolean> {
  const {
    outputDir,
    inputDir,
    primaryColor,
    secondaryColor,
    autoPrefix,
    partSvgrConfig,
    modifiers,
    getNameFn,
  } = { ...defaultConfig, ...config };

  const spinner = logger();
  spinner.info(`Generating SVGs Components`);

  await fs.ensureDir(outputDir);

  const filelist = await glob.promise(`${inputDir}/*.svg`);

  await Promise.all(
    filelist.map(async (filePath) => {
      spinner.start(filePath);

      try {
        const res = await generate(
          filePath,
          outputDir,
          primaryColor,
          secondaryColor,
          autoPrefix,
          partSvgrConfig,
          modifiers,
          getNameFn
        );
        res?.status === GeneratorStatus.Skipped &&
          spinner.info(
            `${res.outputFilePath} was skipped as it already exists`
          );
        res?.status === GeneratorStatus.Done &&
          spinner.succeed(`${res.outputFilePath} was successfully generated`);
      } catch (e) {
        spinner.fail(filePath);
        console.error(e);
      }
    })
  );

  if (filelist.length) {
    spinner.info("All components are generated");
  } else {
    spinner.fail(`No svg was found in ${inputDir}`);
  }

  return true;
}
