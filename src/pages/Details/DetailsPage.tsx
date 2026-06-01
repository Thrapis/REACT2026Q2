import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCharacter } from '@/hooks/query/UseCharacter';

import './DetailsPage.css';
import loadingSVG from '@/assets/loading.svg';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const characterId = id ? parseInt(id, 10) : undefined;

  const {
    data: character,
    isFetching,
    isError,
    error,
  } = useCharacter(characterId);

  const handleUnselectCharacter = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <section className="details-section">
      <h3>Details:</h3>
      <nav className="details-navigation">
        <button
          className="details-close-button"
          onClick={handleUnselectCharacter}
        >
          X
        </button>
      </nav>

      {isFetching && (
        <img className="details-loading-indicator" src={loadingSVG} />
      )}

      {isError && <div className="error-message">{error.message}</div>}

      {!isFetching && !isError && character && (
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
      )}
    </section>
  );
}
