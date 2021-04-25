// 11.模块*.d.ts：基础
declare module "str-utils" {
  type StrUtil = (str: string) => string;
  export const strReverse: StrUtil;
  export const strToLower: StrUtil;
  export const strToUpper: StrUtil;
  export const strRandomize: StrUtil;
  export const strInvertCase: StrUtil;
}
