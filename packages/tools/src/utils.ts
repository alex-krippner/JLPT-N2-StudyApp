import path from "path";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export interface Names {
  fileName: string;
  componentName: string;
}

export function pascalCase(name: string): string {
  return upperFirst(camelCase(name));
}

export function getNames(pathStr: string): Names {
  const baseName = camelCase(path.basename(pathStr, ".svg"));
  const fileName = `${baseName}.tsx`;
  const componentName = pascalCase(baseName);

  return { fileName, componentName };
}
