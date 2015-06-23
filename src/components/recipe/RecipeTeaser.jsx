import React from 'react';

class RecipeTeaser extends React.Component {
  render() {
    return (
      <div className="recipe recipe--teaser">
        <div className="recipe__name">
          <a href={this.props.url}>{this.props.name}</a>
        </div>
        <div className="recipe__source">
          <a href={this.props.source_url} target="_blank">{this.props.source}</a>
        </div>
      </div>
    )
  }
}

module.exports = RecipeTeaser;
