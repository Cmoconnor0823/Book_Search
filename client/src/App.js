import React, { Component } from "react";
import React, { useState } from "react";
import "./App.css";

class App extends Component {
  render() {
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  }
    return (
      <section>
      <form>
        <label>
          <span>Search for books</span>
          <input
            type="search"
            placeholder="microservice, restful design, etc.,"
            value={searchTerm}
            onChange={onInputChange}
          />
          <button type="submit">Search</button>
        </label>
      </form>
    </section>
    );
  }
}

export default App;
