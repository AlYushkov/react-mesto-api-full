import React from 'react';
import Popup from '../Popup';
import Button from '../../Button';
function PopupWithForm({ formId, formTitle, btnInnerHtml, btnText, isBtnDisabled, isOpen, onClose, handleSubmit, children }) {
    return (
        <Popup popupCssClass="popup" contentCssClass="formset formset_theme-light" isActive={isOpen} onClose={onClose}>
            <h2 className="formset__title">{formTitle}</h2>
            <form id={formId} className="form" onSubmit={handleSubmit} noValidate >
                {children}
                <Button btnText={btnText} cssClasses={isBtnDisabled ? 'btn btn_to_save btn_to_save-disabled' : 'btn btn_to_save'} btnType={'submit'} isDisabled={isBtnDisabled}
                    btnInnerHtml={btnInnerHtml} />
            </form>
        </Popup>
    );
};

export default PopupWithForm;
