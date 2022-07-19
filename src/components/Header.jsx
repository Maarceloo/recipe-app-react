import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context';

const Header = () => {
  const { location: { pathname } } = useHistory();
  const { pageTitle } = useContext(AppContext);
  const [searchIsVisible, setSearchIsVisible] = useState(false);

  return (
    <>
      <h1 data-testid="page-title">{pageTitle}</h1>
      <div>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>

        {
          (pathname === '/foods' || pathname === '/drinks') && (
            <button onClick={ () => setSearchIsVisible(!searchIsVisible) } type="button">
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
      </div>
      {searchIsVisible && (
        <SearchBar />
      )}
    </>
  );
};

export default Header;
