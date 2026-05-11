import React from 'react';
import type { CharacterSearchResult } from './types/CharacterSearchResult';
import { getCharactersPage, searchCharacters } from './api/RickAndMortyAPI';
import ChracterCard from './components/ChracterCard/ChracterCard';
import Pagination from './components/Pagination/Pagination';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ErrorThrowButton from './components/ErrorThrowButton/ErrorThrowButton';
import './App.css';
import loadingSVG from './assets/loading.svg';

const LAST_SEARCH_KEY = 'last_search';

interface AppState {
  lastSearch?: string;
  result?: CharacterSearchResult;
  loading: boolean;
  firstLoadCompleted?: boolean;
  error?: string | undefined;
}

class App extends React.Component<Record<string, never>, AppState> {
  searchInput: React.RefObject<HTMLInputElement | null>;
  state: AppState = { loading: false };

  constructor(props: Record<string, never>) {
    super(props);

    const lastSearched = localStorage.getItem(LAST_SEARCH_KEY);
    if (lastSearched !== null) {
      this.state = {
        ...this.state,
        lastSearch: lastSearched,
      };
    }
    this.searchInput = React.createRef();
  }

  componentDidMount(): void {
    if (
      this.searchInput &&
      this.searchInput.current &&
      this.state.lastSearch !== undefined
    ) {
      this.searchInput.current.value = this.state.lastSearch;
    }
    this.handleSearch();
  }

  startLoading = () => {
    this.setState((lastState) => ({ ...lastState, loading: true }));
  };

  endLoading = () => {
    this.setState((lastState) => ({ ...lastState, loading: false }));
  };

  handleSearch = async () => {
    if (this.searchInput?.current?.value !== undefined) {
      let query = this.searchInput?.current?.value;
      query = query.trim();
      this.searchInput.current.value = query;

      if (this.state.firstLoadCompleted && query === this.state.lastSearch) {
        return;
      }

      localStorage.setItem(LAST_SEARCH_KEY, query);

      this.startLoading();
      try {
        const result = await searchCharacters(query, 1);
        this.setState({
          firstLoadCompleted: true,
          lastSearch: query,
          result,
          error: undefined,
        });
      } catch (err: unknown) {
        this.setState({
          error: err instanceof Error ? err.message : 'Something went wrong',
          result: undefined,
        });
      } finally {
        this.endLoading();
      }
    }
  };

  handleSelectPage = async (url: string) => {
    this.startLoading();
    try {
      const result = await getCharactersPage(url);
      this.setState((lastState) => ({
        ...lastState,
        result,
        error: undefined,
      }));
    } catch (err: unknown) {
      this.setState({
        error: err instanceof Error ? err.message : 'Something went wrong',
        result: undefined,
      });
    } finally {
      this.endLoading();
    }
  };

  render() {
    const { loading, result, error } = this.state;

    return (
      <>
        <section className="top-controls-section">
          <input type="text" ref={this.searchInput} />
          <button onClick={this.handleSearch}>Search</button>
        </section>

        <section className="results-section">
          {error === undefined && <h3>Results:</h3>}

          {result === undefined && error === undefined && (
            <span>*No results*</span>
          )}

          {error !== undefined && (
            <ErrorMessage message={error} onRetry={this.handleSearch} />
          )}

          {result?.info && (
            <Pagination
              prevUrl={result.info.prev}
              nextUrl={result.info.next}
              onPageSelect={this.handleSelectPage}
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
              prevUrl={result.info.prev}
              nextUrl={result.info.next}
              onPageSelect={this.handleSelectPage}
            />
          )}
        </section>

        <section className="app-control-section">
          <ErrorThrowButton />
        </section>

        {loading && (
          <div className="loading-space">
            <img className="loading-indicator" src={loadingSVG} />
          </div>
        )}
      </>
    );
  }
}

export default App;
