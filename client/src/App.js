import React from 'react';
import './App.css';
import League from "./components/league";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <League leagueId="13595" />
          <League leagueId="13595" />
        </div>
      </div>
    </div>
  );
}

export default App;
