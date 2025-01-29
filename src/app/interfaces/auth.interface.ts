import { Validators } from "@angular/forms";

export interface Menu{
    link?: string;
    text?: string;
    icon?: string;
}


export type AuthType = 'register' | 'login' | 'forgot-password-step-1' | 'forgot-password-step-2' | 'forgot-password-step-3';
export interface Field{
    fieldId: string;
    validators: Validators;
    value: any,
}
export interface AuthSettings{
    repeat?: string;
    password?: string;
    password2?: string;
    placeholder?: string;
    placeholder2?: string;
    placeholder3?: string;
    country?: string;
    city?: string;
    index?: string;
    button?: string;
    forgot?: string;
    remember?: string;
    licence?: string;
    title: string;
    subtitle?: string;
    actionText: string;
    sections: Array<string>;
    fields: Field[];
};
