import React from 'react';
import './App.css';
import type { CharacterSearchResult } from './types/CharacterSearchResult';
import { getCharactersPage, searchCharacters } from './api/RickAndMortyAPI';
import { ChracterCard } from './components/ChracterCard';
import { Pagination } from './components/Pagination';
import loadingSVG from './assets/loading.svg';

const LAST_SEARCH_KEY = 'last_search';

interface AppState {
  lastSearch?: string;
  result?: CharacterSearchResult;
  loading: boolean;
  firstLoadCompleted?: boolean;
}

class App extends React.Component<Record<string, never>, AppState> {
  searchInput: React.RefObject<HTMLInputElement | null>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { loading: false };

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
      const result = await searchCharacters(query, 1);
      this.endLoading();

      this.setState((lastState) => ({
        ...lastState,
        firstLoadCompleted: true,
        lastSearch: query,
        result,
      }));
    }
  };

  selectPage = async (url: string) => {
    this.startLoading();
    const result = await getCharactersPage(url);
    this.endLoading();

    this.setState((lastState) => ({ ...lastState, result }));
  };

  render() {
    const { loading, result } = this.state;

    return (
      <>
        <section className="top-controls-section">
          <input type="text" ref={this.searchInput} />
          <button onClick={this.handleSearch}>Search</button>
        </section>

        <section className="results-section">
          <h3>Results:</h3>
          {result === undefined && <span>*No results*</span>}
          {result?.error !== undefined && <span>{result?.error}</span>}

          {result?.info && (
            <Pagination
              prevUrl={result.info.prev}
              nextUrl={result.info.next}
              onPageSelect={this.selectPage}
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
              onPageSelect={this.selectPage}
            />
          )}
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
