import React from 'react';
import { useLocalStorage } from '../assets/hooks';

function Profile() {
  const email = useLocalStorage('email', 'get', null);

  return (
    <div>
      <h3 data-testid="profile-email">{email}</h3>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ null }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ null }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ null }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
