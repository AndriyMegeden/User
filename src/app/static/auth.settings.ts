import { Validators } from "@angular/forms";
import { AuthSettings } from "@interfaces/auth.interface";

export const loginSetting: AuthSettings = {
    password: 'auth.password',
    button: 'auth.sign_in_button',
    forgot: 'auth.forgot',
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

export const registerSetting: AuthSettings = {
    repeat:'auth.password',
    password: 'auth.password',
    placeholder: 'auth.email',
    placeholder2: 'auth.name',
    placeholder3: 'auth.surname',
    country: 'auth.country',
    city: 'auth.city',
    index: 'auth.city_index',
    button: 'auth.sign_up_button',
    forgot: 'auth.forgot',
    title: 'auth.sign_up_title', 
    subtitle: 'auth.some_text',
    actionText: 'auth.register', 
    sections: ['logo', 'social', 'agreement', 'licence', 'sign_up', 'button'],
    fields: [
        {
            value: '',
            fieldId: 'Index',
            validators: [Validators.required, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'City',
            validators: [Validators.required, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'Country',
            validators: [Validators.required, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'LastName',
            validators: [Validators.required, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'firstName',
            validators: [Validators.required, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'email',
            validators: [Validators.required, Validators.email, Validators.minLength(3)]
        },
        {
            value: '',
            fieldId: 'password',
            validators: [Validators.required, Validators.minLength(6)]
        },
        {
            value: '',
            fieldId: 'repeatPassword',
            validators: [Validators.required, Validators.minLength(6)]
        },
        {
            value: false,
            fieldId: 'accept',
            validators: [Validators.requiredTrue]
        }
    ]

};

export const forgotPasswordSettingsStep1: AuthSettings = {
    repeat:'auth.repeat_password',
    password: 'auth.new_password',
    placeholder: 'auth.email',
    button: 'auth.next_button',
    remember: 'auth.remember_password',
    title: 'auth.rеcovery_password',
    subtitle: 'auth.enter',
    actionText: 'auth.confirm',
    sections: ['logo', 'button', 'arrow'],
    fields: [
        {
            value: '',
            fieldId: 'email',
            validators: [Validators.required, Validators.email, Validators.minLength(3), ]
        },
    ]
};

export const forgotPasswordSettingsStep2: AuthSettings = {
    repeat:'auth.repeat_password',
    password: 'auth.new_password',
    button: 'auth.next_button',
    remember: 'auth.remember_password',
    title: 'auth.rеcovery_password',
    subtitle: 'auth.send',
    actionText: 'auth.confirm',
    sections: ['logo', 'button', 'code', 'arrow'],
    fields: [
        {
            value: '',
            fieldId: 'code1',
            validators: [Validators.required, Validators.minLength(1)]
        },
        {
            value: '',
            fieldId: 'code2',
            validators: [Validators.required, Validators.minLength(1)]
        },
        {
            value: '',
            fieldId: 'code3',
            validators: [Validators.required, Validators.minLength(1)]
        },
        {
            value: '',
            fieldId: 'code4',
            validators: [Validators.required, Validators.minLength(1)]
        },
    ]
};

export const forgotPasswordSettingsStep3: AuthSettings = {
    repeat:'auth.repeat_password',
    password: 'auth.new_password',
    placeholder: 'auth.large',
    button: 'auth.send_button',
    remember: 'auth.remember_password',
    title: 'auth.new_password',
    subtitle: 'auth.some_text',
    actionText: 'auth.confirm',
    sections: ['logo', 'button', 'arrow'],
    fields: [
        {
            value: '',
            fieldId: 'password',
            validators: [Validators.required, Validators.minLength(6)]
        },
        {
            value: '',
            fieldId: 'repeatPassword',
            validators: [Validators.required, Validators.minLength(6)]
        }
    ]
};