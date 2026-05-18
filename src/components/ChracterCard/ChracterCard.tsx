import type { CharacterSearchResultEntry } from '../../types/CharacterSearchResult';
import './ChracterCard.css';

export interface ChracterCardProps {
  character: CharacterSearchResultEntry;
}

export default function ChracterCard({ character }: ChracterCardProps) {
  return (
    <article className="character-card">
      <img className="character-card-image" src={`${character.image}?0`} />
      <div className="character-card-info">
        <h4 className="character-card-name">{character.name}</h4>
        <div className="character-card-description">
          <span>Species: {character.species}</span>
          <span>Gender: {character.gender}</span>
          <span>Status: {character.status}</span>
        </div>
      </div>
    </article>
  );
}
