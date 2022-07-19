import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { changeLocalStorage } from '../assets/hooks/index';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [redirect, setRedirect] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  useEffect(() => {
    const numeroMin = 6;

    if (password.length > numeroMin && email.includes('@') && email.includes('.com')) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const onButtonClick = () => {
    changeLocalStorage('user', email, 'setUser');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    setRedirect('/foods');
  };

  if (redirect.length > 0) {
    return <Redirect to={ redirect } />;
  }

  return (
    <div>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          name="email"
          data-testid="email-input"
          value={ email }
          // onChange={ (event) => setEmail(event.target.value) }
          onChange={ handleChange }
          // onChange={ (event) => console.log(event.target.name) }
        />
      </label>

      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          name="password"
          data-testid="password-input"
          value={ password }
          // onChange={ (event) => setPassword(event.target.value) }
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
        onClick={ onButtonClick }
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
