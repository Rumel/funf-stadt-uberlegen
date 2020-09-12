import React, { Component } from 'react';
import './App.css';
import League from "./components/league";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      game: null,
      live: null,
      currentWeek: null,
      leagueOne: {
        name: "Fünf Stadt Überlegen I",
        leagueId: 11831,
        promotion: [],
        possiblePromotion: [],
        relegation: [7,8],
        possibleRelegation: [6]
      },
      leagueTwo: {
        name: "Fünf Stadt Überlegen II",
        leagueId: 41399,
        promotion: [1,2],
        possiblePromotion: [3],
        relegation: [],
        possibleRelegation: []
      }
    };
  }

  componentDidMount() {
    axios.get(`/game`)
      .then(res => {
        const { data } = res;

        this.setState({
          game: data,
          currentWeek: data.current_event || 1
        });

        axios.get('/bootstrap')
        .then(res => {
          const { data } = res;
  
          this.setState({
            bootstrap: data
          });

          axios.get(`/live/${this.state.game.current_event}`)
          .then(res => {
            const { data } = res;
    
            this.setState({
              live: data
            });
          });
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <League leagueId="11831"
                    currentWeek={this.state.currentWeek} 
                    live={this.state.live} 
                    settings={this.state.leagueOne}
                    bootstrap={this.state.bootstrap} />
            <League leagueId="41399"
                    currentWeek={this.state.currentWeek} 
                    live={this.state.live}
                    settings={this.state.leagueTwo}
                    bootstrap={this.state.bootstrap} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
