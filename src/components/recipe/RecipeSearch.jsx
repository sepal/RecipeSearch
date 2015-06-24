import React from 'react';

class RecipeSearch extends React.Component {
  render() {
    return (
      <div className="search search--recipe">
        <form accept="UTF-8" method="get" action={this.props.target}>
          <input type="text" className="text text--search" maxLength="128"
                 name="search"
                 placeholder="An ingredient, recipe type, or just anything"
                 value={this.props.search} >
          </input>
          <input type="submit" className="submit" value="Search"></input>
        </form>
      </div>
    );
  }
}

module.exports = RecipeSearch;
