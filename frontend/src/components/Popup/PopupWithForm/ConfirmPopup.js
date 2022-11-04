import React from 'react';
import PopupWithForm from './PopupWithForm';
import { btnConfirmInnerHtml } from '../../../utils/utils';
function ConfirmPopup({ btnText, cardId, isOpen, onClose, onConfirm }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(cardId);
    };

    return (
        <PopupWithForm formId="editAvatar" formTitle="Вы уверены?" btnInnerHtml={btnConfirmInnerHtml} btnText={btnText} isBtnDisabled={false} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit}>
        </PopupWithForm>
    );
}

export default ConfirmPopup;