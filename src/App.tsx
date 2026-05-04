import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <section className="top-controls-section">
          <input type="text" />
          <button>Search</button>
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
