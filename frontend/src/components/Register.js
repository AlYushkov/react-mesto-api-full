import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Button from './Button';
import { btnRegisterInnerHtml } from '../utils/utils';
import formValidator from '../utils/formValidator';

function Register({ btnText, onRegister, onInfoTooltipOpen, onSwitchMode, children }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    const resetForm = () => {
        setPassword('');
        setEmail('');
        formValidator.resetErrors();
    }

    useEffect(() => {
        formValidator.enableValidation(document.forms.namedItem("RegisterForm"), "btn__label_mod_black");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(password, email)
            .then(() => {
                resetForm();
                onSwitchMode(true);
                history.push('/sign-in');
            })
            .catch(err => {
                onInfoTooltipOpen(true, err.message, '0')
            });
    }

    return (
        <div className='formset'>
            <h1 className='formset__title'>Регистрация</h1>
            <form id="RegisterForm" className='form' onSubmit={handleSubmit} noValidate>
                <fieldset className="fieldset">
                    <input
                        required
                        id="emailInput"
                        type="email"
                        className="fieldset__input fieldset__input_mod_white fieldset__input_field_first"
                        placeholder="Email"
                        minLength="4"
                        maxLength="40"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="fieldset__input-error" />
                </fieldset>
                <fieldset className="fieldset">
                    <input
                        required
                        id="passwordInput"
                        type="password"
                        className="fieldset__input fieldset__input_mod_white fieldset__input_field_second"
                        placeholder="Пароль"
                        minLength="6"
                        maxLength="200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="fieldset__input-error fieldset__input-error_field-second" />
                </fieldset>
                <Button btnText={btnText} cssClasses={'btn btn_to_save btn_to_save-white btn_to_save-disabled'} btnType={'submit'} isDisabled={true}
                    btnInnerHtml={btnRegisterInnerHtml} />
                {children}
            </form>

        </div>
    );
}

export default withRouter(Register);