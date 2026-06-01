import { useEffect, useRef } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '@/hooks/UseLocalStorage';
import { useCharacterStore } from '@/stores/Character.store';
import { useTheme } from '@/hooks/UseTheme';

import ChracterCard from '@/components/ChracterCard/ChracterCard';
import Pagination from '@/components/Pagination/Pagination';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import ErrorThrowButton from '@/components/ErrorThrowButton/ErrorThrowButton';

import './HomePage.css';
import loadingSVG from '@/assets/loading.svg';

const LAST_SEARCH_KEY = 'last_search';

export default function HomePage() {
  const { theme } = useTheme();

  const [storageSearchValue, setStorageSearchValue] =
    useLocalStorage(LAST_SEARCH_KEY);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);

  const {
    lastSearch,
    currentPage,
    result,
    isLoading,
    error,
    firstLoadCompleted,
    search,
  } = useCharacterStore();

  const handleSearchSuccess = (query: string, page: number) => {
    setStorageSearchValue(query);
    setSearchParams({
      search: query,
      page: `${page}`,
    });
  };

  const handleSearch = () => {
    if (searchInput?.current?.value !== undefined) {
      const query = searchInput?.current?.value.trim();
      searchInput.current.value = query;

      if (firstLoadCompleted && query === lastSearch && error === undefined) {
        return;
      }

      search(query, 1, handleSearchSuccess);
    }
  };

  const handleSelectPage = (page: number) => {
    search(lastSearch, page, handleSearchSuccess);
  };

  const handleSelectCharacter = (characterId: number) => {
    navigate(`/details/${characterId}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const queryFromParams = searchParams.get('search');
    const pageFromParams = Number(searchParams.get('page')) || 1;

    let initialQuery = '';
    if (queryFromParams !== null) {
      initialQuery = queryFromParams;
    } else if (storageSearchValue !== null) {
      initialQuery = storageSearchValue;
    }

    if (searchInput.current) {
      searchInput.current.value = initialQuery;
    }

    const initialPage = queryFromParams !== null ? pageFromParams : 1;
    search(initialQuery, initialPage, handleSearchSuccess);
  }, []);

  return (
    <>
      <section className={`top-controls-section ${theme}`}>
        <input type="text" ref={searchInput} />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section className={`results-section ${theme}`}>
        <div className="search-results">
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
                <ChracterCard
                  key={item.id}
                  character={item}
                  onCharacterSelect={handleSelectCharacter}
                />
              ))}
          </div>
          {result?.info && (
            <Pagination
              current={currentPage}
              pages={result.info.pages}
              onPageSelect={handleSelectPage}
            />
          )}
        </div>
        <div className="details-side">
          <Outlet />
        </div>
      </section>

      <section className={`app-control-section ${theme}`}>
        <ErrorThrowButton />
      </section>

      {isLoading && (
        <div className={`loading-space ${theme}`}>
          <img className="loading-indicator" src={loadingSVG} />
        </div>
      )}
    </>
  );
}
