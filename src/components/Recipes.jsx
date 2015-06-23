import React from 'react';

import RecipeSearch from './recipe/RecipeSearch'
import RecipeList from './recipe/RecipeList'

class Recipes extends React.Component {
  render() {
    return (
      <div className="recipes">
        <RecipeSearch />
        <RecipeList recipes={this.props.recipes} />
        </div>
    );
  }
}

module.exports = Recipes;
