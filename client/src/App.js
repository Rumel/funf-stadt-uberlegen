import React, { Component } from 'react';
import './App.css';
import League from "./components/league";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      game: null,
      global: {},
      live: null,
      currentWeek: null
    };
  }

  componentDidMount() {
    axios.get(`/game`)
      .then(res => {
        const { data } = res;

        console.log('Game');
        console.log(data);

        this.setState({
          game: data,
          currentWeek: data.current_event
        });

        axios.get(`/live/${this.state.game.current_event}`)
          .then(res => {
            const { data } = res;

            console.log('Live');
            console.log(data);
    
            this.setState({
              live: data
            });
          });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <League leagueId="13567" currentWeek={this.state.currentWeek} live={this.state.live} />
            <League leagueId="13595" currentWeek={this.state.currentWeek} live={this.state.live} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
