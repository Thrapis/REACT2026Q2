import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Image from 'next/image';
import { useCharacter } from '@/hooks/query/UseCharacter';
import { useQueryClient } from '@tanstack/react-query';
import { CharacterKeys } from '@/hooks/query/types';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

import './DetailsPage.css';
import loadingSVG from '@/assets/loading.svg';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const handleRefresh = () => {
    if (characterId) {
      queryClient.invalidateQueries({
        queryKey: CharacterKeys.detail(characterId),
      });
    }
  };

  return (
    <section className="details-section">
      <div className="details-title">
        <button onClick={handleRefresh}>Refresh</button>
        <h3>Details:</h3>
      </div>
      <nav className="details-navigation">
        <button
          className="details-close-button"
          onClick={handleUnselectCharacter}
        >
          X
        </button>
      </nav>

      {isFetching && (
        <Image
          className="details-loading-indicator"
          src={loadingSVG}
          alt="Loading..."
        />
      )}

      {isError && (
        <ErrorMessage
          message={
            error instanceof Error ? error.message : 'Something went wrong'
          }
          onRetry={handleRefresh}
        />
      )}

      {!isFetching && !isError && character && (
        <article className="character-details">
          <Image
            className="character-details-image"
            src={`${character.image}?0`}
            alt={`Image of ${character.name}`}
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
