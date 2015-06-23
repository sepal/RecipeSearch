import React from 'react';
import _ from 'lodash';
import RecipeTeaser from './RecipeTeaser';

class RecipeList extends React.Component {
  render() {
    var recipes = [];
    _.forEach(this.props.recipes, (recipe) => {
      recipes.push(<RecipeTeaser {...recipe} key={recipe.id} />);
    });
    return (
      <div className="list list--recipes">
        {recipes}
      </div>
    )
  }
}

module.exports = RecipeList;
