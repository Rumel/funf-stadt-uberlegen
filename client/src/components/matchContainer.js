import React, { Component } from 'react';
import _ from 'lodash';
import Match from "./match";
import Spinner from "../images/spinner.gif";

class MatchContainer extends Component {
  render() {
    const { matches, entries, picks, picksLoaded, currentWeek, selectedWeek, live} = this.props;

    if(!picksLoaded) {
      return (
        <img src={Spinner} alt="loading..." className="spinner"/>
      );
    }

    const currentMatches = _.filter(matches, (m) => m.event === selectedWeek);

    return (
      currentMatches.map((m) => {
        return (
          <Match match={m} 
                entries={entries} 
                key={`${m.league_entry_1}-${m.league_entry_2}`} 
                picks={picks}
                picksLoaded={picksLoaded}
                currentWeek={currentWeek}
                selectedWeek={selectedWeek}
                live={live} />
        );
      })
    );
  }
}

export default MatchContainer;