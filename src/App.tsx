import React from 'react';
import './App.css';
import type { CharacterSearchResult } from './types/CharacterSearchResult';
import { getCharactersPage, searchCharacters } from './api/RickAndMortyAPI';
import { ChracterCard } from './components/ChracterCard';
import { Pagination } from './components/Pagination';

const LAST_SEARCH_KEY = 'last_search';

interface AppState {
  lastSearch?: string;
  result?: CharacterSearchResult;
}

class App extends React.Component<{}, AppState> {
  searchInput: React.RefObject<HTMLInputElement | null>;

  constructor(props: {}) {
    super(props);
    this.state = {};

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

  handleSearch = async () => {
    if (this.searchInput?.current?.value !== undefined) {
      let query = this.searchInput?.current?.value;
      query = query.trim();
      this.searchInput.current.value = query;

      localStorage.setItem(LAST_SEARCH_KEY, query);
      const result = await searchCharacters(query, 1);
      this.setState((lastState) => ({ ...lastState, result }));
    }
  };

  selectPage = async (url: string) => {
    const result = await getCharactersPage(url);
    this.setState((lastState) => ({ ...lastState, result }));
  };

  render() {
    const { result } = this.state;

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
      </>
    );
  }
}

export default App;
