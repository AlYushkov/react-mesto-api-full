import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { btnSaveInnerHtml } from '../../../utils/utils';
import formValidator from '../../../utils/formValidator';
function AddPlacePopup({ btnText, isOpen, onClose, onSaveCard }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveCard({
            placeName: name,
            placeLink: link
        });
    };
    useEffect(() => {
        formValidator.enableValidation(document.forms.namedItem("addPlace"));
    }, []);

    return (
        <PopupWithForm formId="addPlace" formTitle="Новое место" btnInnerHtml={btnSaveInnerHtml} btnText={btnText} isBtnDisabled={true} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <input
                    required
                    id="nameInput"
                    type="text"
                    className="fieldset__input fieldset__input_field_first"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="fieldset__input-error" />
            </fieldset>
            <fieldset className="fieldset">
                <input
                    required
                    id="linkInput"
                    type="url"
                    className="fieldset__input fieldset__input_field_second"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleChangeLink}
                />
                <span className="fieldset__input-error fieldset__input-error_field-second" />
            </fieldset>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
