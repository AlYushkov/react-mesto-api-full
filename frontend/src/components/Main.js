import React from 'react';
import Button from './Button';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
const Main = React.memo(({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const btnAvatarInnerHtml = { tag: 'img', cssClasses: 'profile__avatar', imageSrc: currentUser? currentUser.avatar : '', altString: 'Автар' };
    return (
        <main className='content'>
            <section className="profile">
                <Button cssClasses={'btn btn_to_edit-avatar'} isDisabled={false} btnType={'button'} btnInnerHtml={btnAvatarInnerHtml} handleClick={onEditAvatar} />
                <div className="profile__profile-info">
                    <h1 className="profile__name">{currentUser? currentUser.name : ''}</h1>
                    <Button cssClasses={'btn btn_to_edit'} isDisabled={false} btnType={'button'} btnInnerHtml={''} handleClick={onEditProfile} />
                    <p className="profile__title">{currentUser? currentUser.about : ''}</p>
                </div>
                <Button cssClasses={'btn btn_to_add'} isDisabled={false} btnType={'button'} btnInnerHtml={''} handleClick={onAddPlace} />
            </section>
            <section className="elements">
                {
                    cards && cards.map((card) => (
                        <Card
                            key={card._id}
                            _id={card._id}
                            link={card.link}
                            placeName={card.name}
                            likes={card.likes}
                            owner={card.owner}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))
                }
            </section>
        </main>
    );
});

export default Main;