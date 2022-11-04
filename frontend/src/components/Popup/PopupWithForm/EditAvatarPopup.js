import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { btnSaveInnerHtml } from '../../../utils/utils';
import formValidator from '../../../utils/formValidator';
function EditAvatarPopup({ btnText, isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef(null);
    useEffect(() => {
        formValidator.enableValidation(document.forms.namedItem("editAvatar"));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar(inputRef.current.value);
    };

    return (
        <PopupWithForm formId="editAvatar" formTitle="Обновить аватар" btnInnerHtml={btnSaveInnerHtml} btnText={btnText} isBtnDisabled={true} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>

            <fieldset className="fieldset">
                <input
                    ref={inputRef}
                    required
                    id="linkInput"
                    type="url"
                    className="fieldset__input fieldset__input_field_second"
                    placeholder="Ссылка на картинку"
                />
                <span className="fieldset__input-error fieldset__input-error_field-second" />
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;