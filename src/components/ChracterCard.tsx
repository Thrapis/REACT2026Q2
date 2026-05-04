import React from 'react';
import './ChracterCard.css';
import type { CharacterSearchResultEntry } from '../types/CharacterSearchResult';

export interface ChracterCardProps {
  character: CharacterSearchResultEntry;
}

export class ChracterCard extends React.PureComponent<ChracterCardProps> {
  render() {
    return (
      <article className="character-card">
        <img
          className="character-card-image"
          src={this.props.character.image}
        />
        <div className="character-card-info">
          <h4 className="character-card-name">{this.props.character.name}</h4>
          <div className="character-card-description">
            <span>Species: {this.props.character.species}</span>
            <span>Gender: {this.props.character.gender}</span>
            <span>Status: {this.props.character.status}</span>
          </div>
        </div>
      </article>
    );
  }
}
