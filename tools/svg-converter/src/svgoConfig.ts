export function svgoConfig(componentName?: string, autoPrefix = true): any {
  const shouldPrefixId = Boolean(autoPrefix && componentName);
  return {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIDs: {
              remove: true,
              minify: shouldPrefixId ? true : false,
            },
            removeViewBox: false,
            convertColors: false,
            removeHiddenElems: false,
            removeUnknownsAndDefaults: {
              unknownContent: true,
              unknownAttrs: true,
              defaultAttrs: false, // disabled to support override black fill
              uselessOverrides: true,
              keepDataAttrs: false,
              keepAriaAttrs: false,
              keepRoleAttr: false,
            },
          },
        },
      },
      {
        name: "removeAttrs",
        params: { elemSeparator: "|", attrs: ["*|xml:.*"] },
      },
      {
        name: "prefixIds",
        params: {
          prefix: shouldPrefixId ? componentName : false,
        },
      },
      "convertStyleToAttrs",
      "cleanupEnableBackground",
      "sortAttrs",
    ],
  };
}
