// 13.给模块增加*.d.ts
// This enables module augmentation mode.
import "../../modules/date-wizard";
declare module "date-wizard" {
  // function方式
  function dateWizard(date: string, format: string) : string;
  
  // const方式
  const pad: (ident: number) => string;

  interface DateDetails {
    hours: number;
    minutes: number;
    seconds: number;
  }
}