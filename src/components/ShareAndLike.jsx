import React, { useState } from 'react';
// import * as clip from 'clipboardy';
// import { useHistory } from 'react-router-dom';
import shareIco from '../images/shareIcon.svg';
import toFavIco from '../images/whiteHeartIcon.svg';
import favIco from '../images/blackHeartIcon.svg';
import { useLocalStorage } from '../assets/hooks';

export default function ShareAndLike() {
  const [copiedAlert, fireAlert] = useState(false);

  // const history = useHistory();
  const checkFavs = useLocalStorage('favoriteRecipes');

  // const shareRecipe = async () => {
  //  const timeAlertisVisible = 3000;
  //  const promise = await clip.write(window.location.href)
  //   .then(() => clip.read());
  //  const { pathname } = history.location;

  //  if (!promise.includes(pathname)) {
  //     throw new Error('copy failed');
  //  }
  //  fireAlert(true);
  //  setTimeout(() => fireAlert(false), timeAlertisVisible);
  // };

  const shareRecipe = () => {
    const timeAlertisVisible = 3000;
    navigator.clipboard.writeText(window.location.href);
    fireAlert(true);
    setTimeout(() => fireAlert(false), timeAlertisVisible);
  };

  const likeRecipe = () => {
    console.log('liked recipe');
  };

  return (
    <div className="share-and-like">
      {copiedAlert && (
        <div>
          Link copied!
        </div>
      )}
      <button type="button" data-testid="share-btn" onClick={ shareRecipe }>
        <img src={ shareIco } alt="share this recipe" />
      </button>
      <button type="button" data-testid="favorite-btn" onClick={ likeRecipe }>
        <img src={ checkFavs ? favIco : toFavIco } alt="Give this recipe a heart" />
      </button>
    </div>
  );
}
