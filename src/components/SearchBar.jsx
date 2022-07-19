import React, { useContext, useState } from 'react';
import useRecipeType from '../assets/hooks/useRecipeType';
import AppContext from '../context';

const SearchBar = () => {
  const [formData, setFormData] = useState({
    queryText: '',
    searchOption: '',
  });
  const { updateFilters } = useContext(AppContext);
  const recipeType = useRecipeType();

  const onFormChange = (e) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;
    setFormData((oldState) => ({
      ...oldState,
      [inputName]: inputVal,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    updateFilters({ ...formData, recipeType });
  };

  return (
    <form onSubmit={ onFormSubmit }>
      <input
        onChange={ onFormChange }
        type="text"
        name="queryText"
        value={ formData.queryText }
        data-testid="search-input"
      />
      <div>
        <label htmlFor="ingredient">
          <input
            onChange={ onFormChange }
            type="radio"
            id="ingredient"
            name="searchOption"
            value="byIngredient"
            data-testid="ingredient-search-radio"
            checked={ formData.searchOption === 'byIngredient' }
          />
          Ingredient
        </label>
        <br />
        <label htmlFor="name">
          <input
            onChange={ onFormChange }
            type="radio"
            id="name"
            name="searchOption"
            value="byName"
            data-testid="name-search-radio"
            checked={ formData.searchOption === 'byName' }
          />
          Name
        </label>
        <br />
        <label htmlFor="firstLetter">
          <input
            onChange={ onFormChange }
            type="radio"
            id="firstLetter"
            name="searchOption"
            value="byFirstLetter"
            data-testid="first-letter-search-radio"
            checked={ formData.searchOption === 'byFirstLetter' }
          />
          First Letter
        </label>
      </div>
      <button type="submit" data-testid="exec-search-btn">Submit</button>
    </form>
  );
};

export default SearchBar;
