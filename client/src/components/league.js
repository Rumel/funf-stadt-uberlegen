import React, { Component } from 'react';
import axios from 'axios';
import Standings from "./standings";
import MatchContainer from "./matchContainer";
import _ from 'lodash';

class League extends Component {
  constructor(props) {
    super(props);

    this.state = {
      league: null,
      leagueEntries: null,
      matches: null,
      standings: null,
      picks: {},
      picksLoaded: false
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.currentWeek !== prevProps.currentWeek) {
      axios.get(`/leagues/${this.props.leagueId}`)
      .then(res => {
        const { data } = res;

        console.log(`League ${this.props.leagueId}`);
        console.log(data);

        this.setState({
          league: data.league,
          leagueEntries: data.league_entries,
          matches: data.matches,
          standings: data.standings
        });

        const leagueEntryIds = _.map(data.league_entries, x => x.entry_id);
        console.log(leagueEntryIds);

        const picks = {};
        const length = leagueEntryIds.length;
        let count = 0;

        _.each(leagueEntryIds, id => {
          axios.get(`/picks/${id}/${this.props.currentWeek}`)
            .then(res => {
              const { data } = res;
              count = count + 1;

              console.log(`Picks Entry: ${id}`);
              console.log(data);

              picks[id] = data.picks;

              if(count === length) {
                this.setState({
                  picks: picks,
                  picksLoaded: true
                })
              }
            });
        });
      });
    }
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
        <Standings standings={this.state.standings} 
                   entries={this.state.leagueEntries} />
        <MatchContainer matches={this.state.matches} 
                        entries={this.state.leagueEntries} 
                        picks={this.state.picks}
                        picksLoaded={this.state.picksLoaded}
                        currentWeek={this.props.currentWeek}
                        live={this.props.live} />
      </div>
    );
  }
}

export default League;