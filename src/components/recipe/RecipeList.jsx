import React from 'react';
import _ from 'lodash';
import RecipeTeaser from './RecipeTeaser';

class RecipeList extends React.Component {
  render() {
    var recipes = [];
    _.forEach(this.props.recipes, (recipe, key) => {
      let className = "row ";
      className += key % 2 == 0 ? "row--even" : "row--odd";

      recipes.push(
        <div className = {className}>
          <RecipeTeaser {...recipe} key={recipe.id} />
        </div>
      );
    });

    if (recipes.length == 0) {
      recipes =
        <div className="empty empty--list">
          <h2>Sorry, no recipes found!</h2>
        </div>;
    }

    return (
      <div className="list list--recipes">
        {recipes}
      </div>
    )
  }
}

module.exports = RecipeList;
