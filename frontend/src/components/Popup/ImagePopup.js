import React from 'react';
import Popup from './Popup';


function ImagePopup({ popupCssClass, isOpen, card, content, onClose }) {
    return (
        <Popup popupCssClass={popupCssClass} contentCssClass='popup-image' isActive={isOpen} onClose={onClose}>
            <img className="popup-image__image" src={card.imgSrc} alt={card.title} onClick={(e) => e.stopPropagation()} />
            <h2 className="popup-image__title">{card.title}</h2>
        </Popup>


    );
}

export default ImagePopup;
