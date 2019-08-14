import React, { Component } from 'react';
import axios from 'axios';
import Standings from "./standings";
import MatchContainer from "./matchContainer";

class League extends Component {
  constructor(props) {
    super(props);

    this.state = {
      league: null,
      leagueEntries: null,
      matches: null,
      standings: null
    };
  }

  componentDidMount() {
    axios.get(`/leagues/${this.props.leagueId}`)
      .then(res => {
        const { data } = res;

        console.log(data);

        this.setState({
          league: data.league,
          leagueEntries: data.league_entries,
          matches: data.matches,
          standings: data.standings
        });
      });
  }

  render() {
    if(this.state.league === null) {
      return null;
    }

    return (
      <div className="col-12">
        <div className="row">
          <div className="col-12">
            <h1>{this.state.league.name}</h1>
          </div>
        </div>
        <Standings standings={this.state.standings} entries={this.state.leagueEntries} />
        <MatchContainer matches={this.state.matches} entries={this.state.leagueEntries} />
      </div>
    );
  }
}

export default League;