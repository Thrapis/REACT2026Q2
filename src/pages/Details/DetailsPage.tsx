import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import type { CharacterSearchResultEntry } from '@/types/CharacterSearchResult';
import { getCharacter } from '@/api/RickAndMortyAPI';
import { useTheme } from '@/hooks/UseTheme';

import './DetailsPage.css';
import loadingSVG from '@/assets/loading.svg';

export default function DetailsPage() {
  const { theme } = useTheme();

  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [lastId, setLastId] = useState<string>('');
  const [character, setCharacter] = useState<
    CharacterSearchResultEntry | undefined
  >();

  const handleUnselectCharacter = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (id) {
      const characterId = parseInt(id, 10);

      getCharacter(characterId).then((result: CharacterSearchResultEntry) => {
        setCharacter(result);
        setLastId(id);
      });
    }
  }, [id]);

  return (
    <section className={`details-section ${theme}`}>
      <h3>Details:</h3>
      <nav className="details-navigation">
        <button
          className="details-close-button"
          onClick={handleUnselectCharacter}
        >
          X
        </button>
      </nav>
      {lastId === id && character ? (
        <article className="character-details">
          <img
            className="character-details-image"
            src={`${character.image}?0`}
          />
          <div className="character-details-info">
            <h4 className="character-details-name">{character.name}</h4>
            <div className="character-details-description">
              <span>Species: {character.species}</span>
              <span>Gender: {character.gender}</span>
              <span>Status: {character.status}</span>
            </div>
          </div>
        </article>
      ) : (
        <img className="details-loading-indicator" src={loadingSVG} />
      )}
    </section>
  );
}
