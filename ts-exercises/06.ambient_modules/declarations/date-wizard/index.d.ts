// 13.给模块增加*.d.ts
// This enables module augmentation mode.
import "../../modules/date-wizard";
declare module "date-wizard" {
  const pad: (ident: number) => string;

  interface DateDetails {
    hours: number;
    minutes: number;
    seconds: number;
  }
}