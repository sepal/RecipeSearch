import React from 'react';

class RecipeTeaser extends React.Component {
  render() {
    return (
      <div className="recipe recipe--teaser">
        <h4 className="recipe__name">
          <a href={this.props.url}>{this.props.name}</a>
        </h4>
        <div className="recipe__source">
          As found on <a href={this.props.source_url} target="_blank">{this.props.source}</a>
        </div>
      </div>
    )
  }
}

module.exports = RecipeTeaser;
