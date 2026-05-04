import React from 'react';
import './App.css';
import type { CharacterSearchResult } from './types/CharacterSearchResult';
import { searchCharacters } from './api/RickAndMortyAPI';
import { ChracterCard } from './components/ChracterCard';

const LAST_SEARCH_KEY = 'last_search';

interface AppState {
  initSearch?: string;
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
        initSearch: lastSearched,
      };
    }
    this.searchInput = React.createRef();
  }

  componentDidMount(): void {
    if (
      this.searchInput &&
      this.searchInput.current &&
      this.state.initSearch !== undefined
    ) {
      this.searchInput.current.value = this.state.initSearch;
    }
    this.handleSearch();
  }

  handleSearch = async () => {
    const query = this.searchInput?.current?.value;
    if (query !== undefined) {
      localStorage.setItem(LAST_SEARCH_KEY, query);
      const result = await searchCharacters(query, 1);
      this.setState((lastState) => ({ ...lastState, result }));
    }
  };

  render() {
    return (
      <>
        <section className="top-controls-section">
          <input type="text" ref={this.searchInput} />
          <button onClick={this.handleSearch}>Search</button>
        </section>

        <section className="results-section">
          <h3>Results:</h3>
          {this.state.result === undefined && <span>*No results*</span>}
          {this.state.result?.error !== undefined && (
            <span>{this.state.result?.error}</span>
          )}
          {this.state.result?.results !== undefined &&
            this.state.result.results.map((item) => (
              <ChracterCard key={item.id} character={item} />
            ))}
          <div className="results-container"></div>
        </section>
      </>
    );
  }
}

export default App;
