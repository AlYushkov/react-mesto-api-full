import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import formValidator from '../../../utils/formValidator';
import { btnSaveInnerHtml } from '../../../utils/utils';
function EditProfilePopup({ btnText, isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);
    const maxLengthName = "30";
    const maxLengthDescr = "200";
    const minLength = "2";
    useEffect(() => {
        formValidator.enableValidation(document.forms.namedItem("editProfile"));
    }, []);
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    };

    return (
        <PopupWithForm formId="editProfile" formTitle="Редактировать профиль" btnInnerHtml={btnSaveInnerHtml} btnText={btnText} isBtnDisabled={true} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <input
                    required
                    id="nameInput"
                    type="text"
                    className="fieldset__input fieldset__input_field_first"
                    placeholder="Имя, фамилия"
                    minlength={minLength}
                    maxlength={maxLengthName}
                    value={name}
                    onChange={handleChangeName}
                />
                <span className="fieldset__input-error" />
            </fieldset>
            <fieldset className="fieldset">
                <input
                    required
                    id="titleInput"
                    type="text"
                    className="fieldset__input fieldset__input_field_second"
                    placeholder="О себе"
                    minlength={minLength}
                    maxlength={maxLengthDescr}
                    value={description}
                    onChange={handleChangeDescription}
                />
                <span className="fieldset__input-error fieldset__input-error_field-second" />
            </fieldset>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
