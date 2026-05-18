import { useEffect, useRef, useState } from 'react';
import type { CharacterSearchResult } from './types/CharacterSearchResult';
import { searchCharacters } from './api/RickAndMortyAPI';
import ChracterCard from './components/ChracterCard/ChracterCard';
import Pagination from './components/Pagination/Pagination';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ErrorThrowButton from './components/ErrorThrowButton/ErrorThrowButton';
import { useSearchParams } from 'react-router-dom';
import './App.css';
import loadingSVG from './assets/loading.svg';

const LAST_SEARCH_KEY = 'last_search';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSearch, setLastSearch] = useState<string>(() => {
    const queryFromParams = searchParams.get('search');
    if (queryFromParams) {
      return queryFromParams;
    }

    const savedLastSearch = localStorage.getItem(LAST_SEARCH_KEY);
    if (savedLastSearch !== null) {
      return savedLastSearch;
    }
    return '';
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [result, setResult] = useState<CharacterSearchResult | undefined>(
    undefined
  );
  const [firstLoadCompleted, setFirstLoadCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const search = async (query: string, page: number) => {
    searchCharacters(query, page)
      .then((result: CharacterSearchResult) => {
        setFirstLoadCompleted(true);
        setLastSearch(query);
        setCurrentPage(page);
        setResult(result);
        setError(undefined);

        setSearchParams({
          search: query,
          page: `${page}`,
        });
      })
      .catch((err: unknown) => {
        const error =
          err instanceof Error ? err.message : 'Something went wrong';
        setResult(undefined);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = async () => {
    if (searchInput?.current?.value !== undefined) {
      let query = searchInput?.current?.value;
      query = query.trim();
      searchInput.current.value = query;

      if (firstLoadCompleted && query === lastSearch) {
        return;
      }

      localStorage.setItem(LAST_SEARCH_KEY, query);

      setIsLoading(true);
      search(query, 1);
    }
  };

  const handleSelectPage = async (page: number) => {
    setIsLoading(true);
    search(lastSearch, page);
  };

  useEffect(() => {
    if (searchInput.current && lastSearch) {
      searchInput.current.value = lastSearch;
    }
    search(lastSearch, 1);
  }, []);

  return (
    <>
      <section className="top-controls-section">
        <input type="text" ref={searchInput} />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className="results-section">
        {error === undefined && <h3>Results:</h3>}

        {result === undefined && error === undefined && (
          <span>*No results*</span>
        )}

        {error !== undefined && (
          <ErrorMessage message={error} onRetry={handleSearch} />
        )}

        {result?.info && (
          <Pagination
            current={currentPage}
            pages={result.info.pages}
            onPageSelect={handleSelectPage}
          />
        )}
        <div className="results-container">
          {result?.results !== undefined &&
            result.results.map((item) => (
              <ChracterCard key={item.id} character={item} />
            ))}
        </div>
        {result?.info && (
          <Pagination
            current={currentPage}
            pages={result.info.pages}
            onPageSelect={handleSelectPage}
          />
        )}
      </section>

      <section className="app-control-section">
        <ErrorThrowButton />
      </section>

      {isLoading && (
        <div className="loading-space">
          <img className="loading-indicator" src={loadingSVG} />
        </div>
      )}
    </>
  );
}
