// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tw = (strings: TemplateStringsArray, ...values: any[]) =>
  String.raw({ raw: strings }, ...values);
