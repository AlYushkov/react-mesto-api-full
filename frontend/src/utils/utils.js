export const config = {
    form: '.form',
    field: '.fieldset',
    input: '.fieldset__input',
    saveButton: '.btn_to_save',
    saveButtonLabel: '.btn__label',
    disabledSaveButton: 'btn_to_save-disabled',
    disabledSaveButtonLabel: 'btn__label_mod_disabled',
    failedInput: 'fieldset__input_mod_fail',
    errorMessage: '.fieldset__input-error'
}

export const btnSaveInnerHtml = { tag: 'span', cssClasses: 'btn__label btn__label_mod_disabled', spanText: 'Сохранить' }
export const btnLoginInnerHtml = { tag: 'span', cssClasses: 'btn__label btn__label_mod_disabled btn__label_mod_black', spanText: 'Войти' }
export const btnRegisterInnerHtml = { tag: 'span', cssClasses: 'btn__label btn__label_mod_disabled btn__label_mod_black', spanText: 'Зарегистрироваться' }
export const btnConfirmInnerHtml = { tag: 'span', cssClasses: 'btn__label', spanText: 'Да' }