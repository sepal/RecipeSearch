import React from 'react';

class RecipeTeaser extends React.Component {
  render() {
    return (
      <div className="recipe recipe--teaser">
        <h4 className="recipe__name">
          <a href={this.props.url}>{this.props.name}</a>
        </h4>
        <div className="recipe__source">
          {this.props.author}
        </div>
      </div>
    )
  }
}

module.exports = RecipeTeaser;
