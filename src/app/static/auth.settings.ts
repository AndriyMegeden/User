import { Validators } from "@angular/forms";
import { AuthSettings } from "@interfaces/auth.interface";

export const loginSetting: AuthSettings = {
    password: 'auth.password',
    button: 'auth.sign_in_button',
    title: 'auth.improve',
    subtitle: 'auth.make',
    placeholder: 'auth.email',
    actionText: 'auth.login',
    sections: ['logo', 'social',  'agreement', 'sign_in', 'button'],
    fields: [
        {
            value: '',
            fieldId: 'email',
            validators: [Validators.required, Validators.email, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'password',
            validators: [Validators.required, Validators.minLength(6)]
        }
    ]
};

