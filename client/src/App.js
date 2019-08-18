import React, { Component } from 'react';
import './App.css';
import League from "./components/league";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <League leagueId="13567" />
            <League leagueId="13595" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
