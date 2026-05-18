import type { CharacterSearchResultEntry } from '../../types/CharacterSearchResult';
import './ChracterCard.css';

export interface ChracterCardProps {
  character: CharacterSearchResultEntry;
  onCharacterSelect?: (id: number) => void;
}

export default function ChracterCard({
  character,
  onCharacterSelect,
}: ChracterCardProps) {
  return (
    <article
      className="character-card"
      onClick={() => onCharacterSelect?.(character.id)}
    >
      <img className="character-card-image" src={`${character.image}?0`} />
      <div className="character-card-info">
        <h4 className="character-card-name">{character.name}</h4>
      </div>
    </article>
  );
}
