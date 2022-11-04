import React from 'react';
import Popup from './Popup';
import lack from '../../images/Lack.png';
import ok from '../../images/Ok.png';
function InfoTooltip({ isOpen, onDisplay, message, image }) {
    const closeInfoTooltip = () => {
        onDisplay(false);
    }
    return (
        <Popup popupCssClass='popup popup-message' contentCssClass='formset formset_theme-light' isActive={isOpen} onClose={closeInfoTooltip}>
            <img className="popup-message__image" src={image === '0' ? lack : ok} alt='result' onClick={(e) => e.stopPropagation()} />
            <h2 className="popup-message__title">{message}</h2>
        </Popup>
    );
}

export default InfoTooltip;
