'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import useLocalStorage from '@/hooks/local-storage/UseLocalStorage';
import { useCharacterSearch } from '@/hooks/query/UseCharacterSearch';

import ChracterCard from '@/components/ChracterCard/ChracterCard';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import ErrorThrowButton from '@/components/ErrorThrowButton/ErrorThrowButton';
import { CharacterKeys } from '@/hooks/query/types';

import './page.css';
import loadingSVG from '@/assets/loading.svg';

const LAST_SEARCH_KEY = 'last-search';

interface HomePageProps {
  children?: React.ReactNode;
}

export default function HomePage({ children }: HomePageProps) {
  const [storageSearchValue, setStorageSearchValue] =
    useLocalStorage(LAST_SEARCH_KEY);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const searchInput = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const queryFromParams = searchParams?.get('search') ?? null;
  const pageFromParams = Number(searchParams?.get('page')) || 1;

  const initialQuery =
    queryFromParams !== null ? queryFromParams : storageSearchValue || '';
  const initialPage = queryFromParams !== null ? pageFromParams : 1;

  const { data, isFetching, isError, error } = useCharacterSearch(
    initialQuery,
    initialPage
  );

  useEffect(() => {
    if (queryFromParams === null && storageSearchValue) {
      const params = new URLSearchParams();
      params.set('search', storageSearchValue);
      params.set('page', '1');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [queryFromParams, storageSearchValue, router, pathname]);

  const handleSearch = () => {
    if (searchInput?.current) {
      const query = searchInput.current.value.trim();
      searchInput.current.value = query;

      setStorageSearchValue(query);

      const params = new URLSearchParams();
      params.set('search', query);
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleSelectPage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', `${page}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelectCharacter = (characterId: number) => {
    const currentQueries = searchParams?.toString() || '';
    router.push(
      `/details/${characterId}${currentQueries ? `?${currentQueries}` : ''}`
    );
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: CharacterKeys.search(initialQuery, initialPage),
    });
  };

  return (
    <>
      <section className="top-controls-section">
        <input type="text" ref={searchInput} defaultValue={initialQuery} />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className="info-section">
        To get API Error spam &apos;Refresh&apos; button
      </section>

      <section className="results-section">
        <div className="search-results">
          {!isError && (
            <div className="results-title">
              <button onClick={handleRefresh}>Refresh</button>
              <h3>Results:</h3>
            </div>
          )}

          {data === undefined && !isError && !isFetching && (
            <span>*No results*</span>
          )}

          {isError && (
            <ErrorMessage
              message={
                error instanceof Error ? error.message : 'Something went wrong'
              }
              onRetry={handleRefresh}
            />
          )}

          {!isError && data?.info && (
            <Pagination
              current={initialPage}
              pages={data.info.pages}
              onPageSelect={handleSelectPage}
            />
          )}

          <div className="results-container">
            {!isError &&
              data?.results !== undefined &&
              data.results.map((item) => (
                <ChracterCard
                  key={item.id}
                  character={item}
                  onCharacterSelect={handleSelectCharacter}
                />
              ))}
          </div>

          {!isError && data?.info && (
            <Pagination
              current={initialPage}
              pages={data.info.pages}
              onPageSelect={handleSelectPage}
            />
          )}
        </div>
        <div className="details-side">{children}</div>
      </section>

      <section className="app-control-section">
        <ErrorThrowButton />
      </section>

      {isFetching && (
        <div className="loading-space">
          <Image
            className="loading-indicator"
            src={loadingSVG}
            alt="Loading..."
            loading="eager"
          />
        </div>
      )}
    </>
  );
}
