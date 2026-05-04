import React from 'react';
import './App.css';

const LAST_SEARCH_KEY = 'last_search';

interface AppState {
  initSearch: string | null;
}

class App extends React.Component<{}, AppState> {
  searchInput: React.RefObject<HTMLInputElement | null>;

  constructor(props: {}) {
    super(props);
    this.state = { initSearch: null };

    const lastSearched = localStorage.getItem(LAST_SEARCH_KEY);
    if (lastSearched !== null) {
      this.state = { initSearch: lastSearched };
    }
    this.searchInput = React.createRef();
  }

  componentDidMount(): void {
    if (
      this.searchInput &&
      this.searchInput.current &&
      this.state.initSearch !== null
    ) {
      this.searchInput.current.value = this.state.initSearch;
    }
  }

  handleSearch = () => {
    const query = this.searchInput?.current?.value;
    if (query !== undefined) {
      localStorage.setItem(LAST_SEARCH_KEY, query);
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
          <span>*No results*</span>
          <div className="results-container"></div>
        </section>
      </>
    );
  }
}

export default App;
