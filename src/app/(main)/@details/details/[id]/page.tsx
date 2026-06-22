'use client';

import { use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useCharacter } from '@/hooks/query/UseCharacter';
import { useQueryClient } from '@tanstack/react-query';
import { CharacterKeys } from '@/hooks/query/types';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

import './page.css';
import loadingSVG from '@/assets/loading.svg';

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function DetailsPage({ params }: DetailsPageProps) {
  const { id } = use(params);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const characterId = id ? parseInt(id, 10) : undefined;

  const {
    data: character,
    isFetching,
    isError,
    error,
  } = useCharacter(characterId);

  const handleUnselectCharacter = () => {
    const currentQueries = searchParams ? searchParams.toString() : '';
    router.push(`/${currentQueries ? `?${currentQueries}` : ''}`);
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
          loading="eager"
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
            src={`${character.image}`}
            alt={`Image of ${character.name}`}
            width={280}
            height={280}
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
