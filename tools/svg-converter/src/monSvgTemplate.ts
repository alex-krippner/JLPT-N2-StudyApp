export const SvgPropsTag = `
interface SvgProps extends React.SVGProps<SVGSVGElement> {
    primaryColor?: string;
    secondaryColor?: string;
}`;

export function monSvgTemplate(variables: any, { tpl }: any) {
  return tpl`
    import * as React from "react";
    ${variables.interfaces};

    ${SvgPropsTag}

    export const ${variables.componentName} = React.memo(function ${variables.componentName}(svgProps: SvgProps) {
        const {primaryColor, secondaryColor, ...props} = svgProps
        return ${variables.jsx};
    })

    ${variables.componentName}.displayName = "${variables.componentName}";
    `;
}

export function inlineSvgTemplate(variables: any, { tpl }: any): string {
  return tpl`
    ${variables.jsx}`;
}
