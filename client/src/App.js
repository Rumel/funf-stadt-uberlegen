import React, { Component } from 'react';
import './App.css';
import League from "./components/league";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      game: null
    };
  }

  componentDidMount() {
    axios.get(`/game`)
      .then(res => {
        const { data } = res;

        console.log('Game');
        console.log(data);

        this.setState({
          game: data
        });
      });
  }

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
