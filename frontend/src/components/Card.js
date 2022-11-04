import React from 'react';
import Button from './Button';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = React.memo(({ _id, link, placeName, likes, owner, onCardLike, onCardClick, onCardDelete }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = owner === currentUser._id;
    const cardDeleteButtonClassName = isOwn ? 'btn btn_to_delete' : 'btn btn_to_delete btn_hidden';
    const isLiked = likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = isLiked ? 'btn btn_to_check btn_to_check-active' : 'btn btn_to_check';
    const handleClick = () => {
        onCardClick({ imgSrc: link, title: placeName });
    };
    const handleLikeClick = () => {
        onCardLike({ _id, likes });
    };

    const handleDeleteClick = () => {
        onCardDelete(_id);
    };
    return (
        <figure id={_id} className="element" >
            <div className="element__img-wrapper">
                <Button cssClasses={cardDeleteButtonClassName} btnType={"button"} isDisabled={false} btnInnerHtml={''} handleClick={handleDeleteClick} />
                <img className="element__image" src={link} alt={placeName} onClick={handleClick} />
            </div>
            <figcaption className="element__text">
                <h3 className="element__title">{placeName}</h3>
                <div className="element__likes">
                    <Button cssClasses={cardLikeButtonClassName} btnType={"button"} isDisabled={false} btnInnerHtml={''} handleClick={handleLikeClick} />
                    <h2 className="element__likes_text">{likes.length}</h2>
                </div>
            </figcaption>
        </figure>
    );
})

export default Card;