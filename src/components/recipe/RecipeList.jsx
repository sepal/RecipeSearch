import React from 'react';
import _ from 'lodash';
import RecipeTeaser from './RecipeTeaser';

class RecipeList extends React.Component {
  render() {
    var recipes = [];
    var classNames = ["list list--recipe"];

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
      recipes = <h2>Sorry, no recipes found!</h2>;
      classNames.push("list--empty");
    }

    return (
      <div className={classNames.join(' ')}>
        {recipes}
      </div>
    )
  }
}

module.exports = RecipeList;
