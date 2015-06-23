import React from 'react';

class RecipeSearch extends React.Component {
  render() {
    return (
      <div className="search search--recipe">
        <input type="text" className="text text--search" maxLength="128"
               name="search" placeholder="An ingredient, recipe type, or just anything">
        </input>
        <input type="submit" className="submit" value="Search"></input>
      </div>
    );
  }
}

module.exports = RecipeSearch;
