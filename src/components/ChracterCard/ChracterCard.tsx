import { useTheme } from '@/hooks/UseTheme';
import { useSelectionStore } from '@/stores/Selection.store';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';

import './ChracterCard.css';

export interface ChracterCardProps {
  character: CharacterSearchResultEntry;
  onCharacterSelect?: (id: number) => void;
}

export default function ChracterCard({
  character,
  onCharacterSelect,
}: ChracterCardProps) {
  const { theme } = useTheme();

  const { isSelected, toggleSelection } = useSelectionStore();

  const handleCheckClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const handleCheckChange = () => {
    toggleSelection(character);
  };

  return (
    <article
      className={`character-card ${theme}`}
      onClick={() => onCharacterSelect?.(character.id)}
    >
      <input
        className="character-card-checkbox"
        type="checkbox"
        checked={isSelected(character.id)}
        onClick={handleCheckClick}
        onChange={handleCheckChange}
      />
      <img className="character-card-image" src={`${character.image}?0`} />
      <div className="character-card-info">
        <h4 className="character-card-name">{character.name}</h4>
      </div>
    </article>
  );
}
