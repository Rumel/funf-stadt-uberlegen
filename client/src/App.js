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
        leagueId: 13567,
        promotion: [],
        possiblePromotion: [],
        relegation: [7,8],
        possibleRelegation: [6]
      },
      leagueTwo: {
        leagueId: 13595,
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

        console.log('Game');
        console.log(data);

        this.setState({
          game: data,
          currentWeek: data.current_event
        });

        axios.get('/bootstrap')
        .then(res => {
          const { data } = res;

          console.log('Bootstrap');
          console.log(data);
  
          this.setState({
            bootstrap: data
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
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <League leagueId="13567"
                    currentWeek={this.state.currentWeek} 
                    live={this.state.live} 
                    settings={this.state.leagueOne}
                    bootstrap={this.state.bootstrap} />
            <League leagueId="13595"
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
