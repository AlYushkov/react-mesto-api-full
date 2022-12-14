import React, { useEffect, useState } from "react";
import { Switch, Link, Redirect, Route, withRouter, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"
import Login from "./Login";
import Register from "./Register";
import Main from './Main';
import EditProfilePopup from './Popup/PopupWithForm/EditProfilePopup';
import EditAvatarPopup from './Popup/PopupWithForm/EditAvatarPopup';
import AddPlacePopup from './Popup/PopupWithForm/AddPlacePopup';
import ImagePopup from './Popup/ImagePopup';
import ConfirmPopup from "./Popup/PopupWithForm/ConfirmPopup";
import api from '../utils/api';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './Popup/InfoTooltip';
import * as auth from "../utils/auth";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const App = () => {
  /* main content constants */
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardsHandleQty, setCardsHandleQty] = useState(0); // to trigger the useEffect as card changed
  const [cardId, setCardId] = useState(null);
  const [btnText, setBtnText] = useState('');

  /* authentication constants */
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultImage, setResultImage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();

  /******  set props for the InfoTooltip******/
  const setInfoTooltipOpen = (isOpen, message, image) => {
    setIsInfoTooltipOpen(isOpen);
    setResultMessage(message);
    setResultImage(image);
    setBtnText('');
  }

  /* to activate confirm popup */
  function handleCardDelete(cardId) {
    setCardId(cardId);
    setIsConfirmPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setCardId(null);
    setBtnText('');
  };

/* to allow cyrillic text only in error messages*/
const errorMessage = (message) => {
  const regex = /^([??-??????-??????0-9] ?)+$/;
  const msg = regex.test(message) ? message : '??????-???? ?????????? ???? ??????...';
      setInfoTooltipOpen(true, msg,'0');
}

  /* main content proccessing */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (userInfo) => {
    setBtnText('????????????????????...');
    const userInfoPromise = api.setUserInfoAsync(userInfo.name, userInfo.about);
    userInfoPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCurrentUser(data.data);
          closeAllPopups();
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);        
      })
  };

  const handleUpdateAvatar = (link) => {
    setBtnText('????????????????????...');
    const avatarPromise = api.setAvatarAsync(link);
    avatarPromise
      .then((response) => {
        if (response.ok) {
          return response.json()
        }  else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCurrentUser(data.data);
          closeAllPopups();
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      });
  }

  /* to add new place */
  const handleAddPlace = (placeData) => {
    setBtnText('????????????????????...');
    const cardPromise = api.saveCardAsync(placeData.placeName, placeData.placeLink);
    cardPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCards([data.data, ...cards]);
          setCardsHandleQty(cardsHandleQty + 1);
          closeAllPopups();
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      })
  }

  /*  rerieve cards for the current user */

  React.useEffect(() => {
    if (!loggedIn) {
      setCards([]);
      return;
    }
    const cardsPromise = api.getDataAsync();
    cardsPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }  else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????..'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCards(data.data);
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, cardsHandleQty]);

  /* to add or delete like for a card */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardPromise = api.changeLikeCardStatusAsync(card._id, !isLiked);
    cardPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }  else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCards((state) => state.map((c) => c === data.data._id ? data.data._id : c));
          setCardsHandleQty(cardsHandleQty + 1);
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      });
  }

  /* to delete the card if it was confirmed in popup */
  function DeleteCard(cardId) {
    setBtnText('????????????????...');
    const deleteCardPromise = api.deleteCardAsync(cardId)
    deleteCardPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCards(cards.filter(card => card._id !== cardId));
          setCardsHandleQty(cardsHandleQty + 1);
          closeAllPopups();
          return;
        } else if (data.message) {
          setIsConfirmPopupOpen(false);
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      })
  };

  /********** authentication *************/
  const onLogin = (password, email) => {
    setBtnText('??????????????????...');
    const autorizePromise = auth.authorize(password, email);
    autorizePromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if(response.status === 401) {
          return Promise.reject(new Error('?????????? ?????? ???????????? ?? ??????????????'));
        }
      })
      .then((data) => {
        if (data.data) {
          setLoggedIn(true);
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      })
      .finally(() => {
        setBtnText('');
      });
  };

  const onRegister = (password, email) => {
    setBtnText('??????????????????...');
    
    const registerPromise = auth.register(password, email);
    registerPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 409) {
          return Promise.reject(new Error('???????? ?????????? ?????? ????????????????????????????'));
        }
      })
      .then((data) => {
        if (data.data) {
          setInfoTooltipOpen(true, '???? ?????????????? ????????????????????????????????????!', '1');
          history.push('/sign-in');
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      })
      .finally(() => {
        setBtnText('');
      });
  };

  const signOut = () => {
    const signoutPromise = auth.logout();
    signoutPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.message) {
          setInfoTooltipOpen(true, data.message, '1');
          switchMode(true);
          history.push('/sign-in');
          setLoggedIn(false);
          return;
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      })
  }

  /* verify if there is a token */
  useEffect(() => {
    const accessPromise = auth.verifyAccess();
    accessPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setLoggedIn(true);
        } else {
          setInfoTooltipOpen(true, '???????????????????? ????????????????????????????', '1');
          return;
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* retrieve user data */

  useEffect(() => {
    if (!loggedIn) {
      setCurrentUser({});
      return;
    }
    const contentPromise = auth.getMe();
    contentPromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }  else {
          return Promise.reject(new Error('??????-???? ?????????? ???? ??????...'));
        }
      })
      .then((data) => {
        if (data.data) {
          setCurrentUser(data.data);
          return;
        } else if (data.message) {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((err) => {
        errorMessage(err.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  /* redirecting to main url */
  useEffect(() => {
    if (loggedIn) {
      history.push('/main');
    }
  }, [history, loggedIn]);

  /* set props for Header component */
  const switchMode = (mode) => {
    // true: login, false: register
    setIsLogin(mode);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLogin={isLogin} loggedIn={loggedIn} onSignOut={signOut} onSwitchMode={switchMode} />
        <Switch>
          <ProtectedRoute path='/main'
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main} />
          <Route path='/sign-in'>
            <Login btnText={btnText} onLogin={onLogin} onInfoTooltipOpen={setInfoTooltipOpen} />
          </Route>
          <Route path='/sign-up'>
            <Register btnText={btnText} onRegister={onRegister} onInfoTooltipOpen={setInfoTooltipOpen} onSwitchMode={switchMode}>
              <Link className='btn formset__link' to="/sign-in" onClick={() => switchMode(true)} >?????? ????????????????????????????????? ??????????</Link>
            </Register>
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/main' /> : <Redirect to='/sign-in' />}
          </Route>
        </Switch>
        <Footer />
        {
          isEditAvatarPopupOpen && <EditAvatarPopup popupCssClass="popup" btnText={btnText}
            isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        }
        {
          isEditProfilePopupOpen && <EditProfilePopup popupCssClass="popup" btnText={btnText}
            isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        }
        {
          isAddPlacePopupOpen && <AddPlacePopup popupCssClass="popup" btnText={btnText}
            isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSaveCard={handleAddPlace} />
        }
        {
          isConfirmPopupOpen && <ConfirmPopup popupCssClass="popup" cardId={cardId} btnText={btnText}
            isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onConfirm={DeleteCard} />
        }
        {
          selectedCard && <ImagePopup popupCssClass="popup popup_bckg_dark"
            isOpen={selectedCard} card={selectedCard} onClose={closeAllPopups} />
        }
        {
          isInfoTooltipOpen && <InfoTooltip popupCssClass="popup"
            isOpen={isInfoTooltipOpen} onDisplay={setInfoTooltipOpen} message={resultMessage} image={resultImage} />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

