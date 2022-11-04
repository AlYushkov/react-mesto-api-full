import React from 'react';

const Button = React.memo(({ btnText, cssClasses, btnType, isDisabled, btnInnerHtml, handleClick }) => {
    return (
        <button className={cssClasses} type={btnType} disabled={isDisabled} onClick={handleClick}>
            {btnInnerHtml.tag === 'img'
                && <img className={btnInnerHtml.cssClasses} src={btnInnerHtml.imageSrc} alt={btnInnerHtml.altString} />}
            {btnInnerHtml.tag === 'span'
                && <span className={btnInnerHtml.cssClasses}>{btnText ? btnText : btnInnerHtml.spanText}</span>}
        </button>
    );
});
export default Button;
