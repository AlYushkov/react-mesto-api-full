import { config } from './utils';
class FromValidator {
    #configData;
    #formElement;
    #fields;
    #fieldKeys;
    #button;
    #buttonLabel;
    constructor(configData) {
        this.#configData = configData;

    };

    enableValidation(formElement) {
        this.#formElement = formElement;
        this.#fields = this.#getFields();
        this.#fieldKeys = Object.keys(this.#fields);
        this.#button = this.#formElement.querySelector(this.#configData.saveButton);
        this.#buttonLabel = this.#button.querySelector(this.#configData.saveButtonLabel);
        this.#setEventListeners();
    };

    #getFields() {
        const fields = {}
        const fieldsArray = Array.from(this.#formElement.querySelectorAll(this.#configData.field));
        fieldsArray.forEach((field) => {
            const fieldsElement = {};
            fieldsElement.input = field.querySelector(this.#configData.input);
            fieldsElement.errorMessage = field.querySelector(this.#configData.errorMessage);
            fieldsElement.errorMessage.textContent = "";
            fields[`${fieldsElement.input.id}`] = fieldsElement;
        })
        return fields;
    };

    #handleInput(key) {
        this.#checkInputValidity(key);
        this.#toggleButtonState();
    };

    #setEventListeners() {

        this.#fieldKeys.forEach((key) => {
            this.#fields[key].input.addEventListener('input', () => {
                this.#handleInput(key);
            });
        })
    };

    #toggleButtonState() {
        const inValid = (this.#fieldKeys.some(key => {
            return this.#fields[key].input.validity.valid === false;
        }));
        if (inValid) {
            this.#button.classList.add(this.#configData.disabledSaveButton);
            this.#buttonLabel.classList.add(this.#configData.disabledSaveButtonLabel);
            this.#button.disabled = true;
        }
        else if (this.#button.classList.contains(this.#configData.disabledSaveButton)) {
            this.#button.classList.remove(this.#configData.disabledSaveButton);
            this.#buttonLabel.classList.remove(this.#configData.disabledSaveButtonLabel);
            this.#button.disabled = false;
        }
    };

    #checkInputValidity(key) {
        const fieldElement = this.#fields[key];
        if (fieldElement.input.validity.valid) {
            this.#hideInputError(fieldElement);
        } else {
            this.#showInputError(fieldElement);
        }
    };

    #showInputError(field) {
        field.input.classList.add(this.#configData.failedInput);
        field.errorMessage.textContent = field.input.validationMessage;
    };

    #hideInputError(field) {
        if (field.input.classList.contains(this.#configData.failedInput)) {
            field.input.classList.remove(this.#configData.failedInput);
            field.errorMessage.textContent = "";
        }
    };

    resetErrors() {
        this.#fieldKeys.forEach((key) => {
            const fieldElement = this.#fields[key];
            this.#hideInputError(fieldElement);
        })
        if (this.#button.classList.contains(this.#configData.disabledSaveButton)) return;
        this.#button.classList.add(this.#configData.disabledSaveButton);
        this.#buttonLabel.classList.add(this.#configData.disabledSaveButtonLabel);
        this.#button.disabled = true;
    };
}

const formValidator = new FromValidator(config);

export default formValidator;