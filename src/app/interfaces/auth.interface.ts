import { Validators } from "@angular/forms";

export interface Menu {
  link?: string;
  text?: string;
  icon?: string;
}

export type AuthType = "login";
export interface Field {
  fieldId: string;
  validators: Validators;
  value: any;
}
export interface AuthSettings {
  password?: string;
  placeholder?: string;
  button?: string;
  remember?: string;
  title: string;
  subtitle?: string;
  actionText: string;
  sections: Array<string>;
  fields: Field[];
}
