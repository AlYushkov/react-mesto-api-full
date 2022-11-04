import React, { useEffect, useCallback } from 'react';
import Button from '../Button';

function Popup({ popupCssClass, contentCssClass, isActive, onClose, children }) {
    const handleEscClose = useCallback((event) => {
        if (event.key === "Escape") {
            onClose();
        };
    }, [onClose]);

    useEffect(() => {
        if (isActive) {
            document.addEventListener('keydown', handleEscClose);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [isActive, handleEscClose]);

    function closePopup(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={isActive ? `${popupCssClass} popup_active` : `${popupCssClass}`} onClick={closePopup}>
            <div className={contentCssClass} onClick={closePopup}>
                <Button cssClasses={'btn btn_to_close'} isDisabled={false} btnType={'button'} btnInnerHtml={''} handleClick={onClose} />
                {children}
            </div>
        </div>
    );
}

export default Popup;