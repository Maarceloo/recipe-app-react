import React, { useContext, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { changeLocalStorage } from '../assets/hooks';
import AppContext from '../context';

function Profile() {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Profile');
  }, []);

  const history = useHistory();

  const user = changeLocalStorage('user');

  const handleClickLogout = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      { user && (<h3 data-testid="profile-email">{ user.email }</h3>)}
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleClickLogout }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
