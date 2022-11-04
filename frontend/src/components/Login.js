import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import Button from './Button';
import { btnLoginInnerHtml } from '../utils/utils';
import formValidator from '../utils/formValidator';
function Login({ btnText, onLogin, onInfoTooltipOpen }) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    const resetForm = () => {
        setPassword('');
        setEmail('');
        formValidator.resetErrors();
    }

    useEffect(() => {
        formValidator.enableValidation(document.forms.namedItem("LoginForm"));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(password, email)
            .then(() => {
                resetForm();
                history.push('/main');
            })
            .catch((err) => {
                onInfoTooltipOpen(true, err.message, '0')
            });
    }

    return (
        <div className='formset'>
            <h1 className='formset__title'>Вход</h1>
            <form id="LoginForm" className='form' onSubmit={handleSubmit} noValidate>
                <fieldset className="fieldset">
                    <input
                        required
                        id="emailInput"
                        type="email"
                        className="fieldset__input fieldset__input_mod_white fieldset__input_field_first"
                        placeholder="Email"
                        minLength="5"
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
                        minLength="8"
                        maxLength="200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="fieldset__input-error fieldset__input-error_field-second" />
                </fieldset>
                <Button btnText={btnText} cssClasses={'btn btn_to_save btn_to_save-white btn_to_save-disabled'} btnType={'submit'} isDisabled={true}
                    btnInnerHtml={btnLoginInnerHtml} />
            </form>
        </div>
    );
}

export default withRouter(Login);