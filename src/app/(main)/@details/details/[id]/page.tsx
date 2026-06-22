'use client';

import Image from 'next/image';
import { use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useCharacter } from '@/hooks/query/UseCharacter';
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
  const t = useTranslations('DetailsPage');

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
        <button onClick={handleRefresh}>{t('refresh')}</button>
        <h3>{t('details')}</h3>
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
          alt={t('altLoadingImage')}
          loading="eager"
        />
      )}

      {isError && (
        <ErrorMessage
          message={
            error instanceof Error ? error.message : t('unknownErrorMessage')
          }
          onRetry={handleRefresh}
        />
      )}

      {!isFetching && !isError && character && (
        <article className="character-details">
          <Image
            className="character-details-image"
            src={`${character.image}`}
            alt={`${t('altImageOf')} ${character.name}`}
            width={280}
            height={280}
          />
          <div className="character-details-info">
            <h4 className="character-details-name">{character.name}</h4>
            <div className="character-details-description">
              <span>
                {t('speciesProp')} {character.species}
              </span>
              <span>
                {t('genderProp')} {character.gender}
              </span>
              <span>
                {t('statusProp')} {character.status}
              </span>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
