import React, { Component } from 'react';
import _ from "lodash";

class Match extends Component {
  getTeamLink = (entryId, gameWeek) => {
    return `https://draft.premierleague.com/entry/${entryId}/event/${gameWeek}`;
  }

  calculatePoints(entryId, finished, entryPoints, picks, live) {
    if (finished) {
      return entryPoints;
    } else {
      const elements = picks[entryId].slice(0,11).map(x => x.element);
      let points = 0;

      _.each(elements, elem => {
        points = points + live.elements[elem].stats.total_points;
      });

      return points;
    }
  }

  renderMatchRow(entryId, entryName, selectedWeek, finished, matchPoints, picks, live) {
    return (
      <div className="col-12">
        <div className="row">
          <div className="col-9 text-left">
            <a href={this.getTeamLink(entryId, selectedWeek)} target="_blank" rel="noopener noreferrer">
              <p className="match-team-text">
                {entryName}
              </p>
            </a>
          </div>
          <div className="col-3">
            <p className="match-score-text">
              {this.calculatePoints(entryId, finished, matchPoints, picks, live)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { match, entries, picks, picksLoaded, currentWeek, selectedWeek, live } = this.props;

    if(currentWeek === selectedWeek && (!picksLoaded || !live)) {
      return null;
    }

    const firstEntry = _.find(entries, (e) => e.id === match.league_entry_1);
    const secondEntry = _.find(entries, (e) => e.id === match.league_entry_2);
    const { finished } = match;

    return(
      <div className="col-12 col-md-6">
        <div className="match-box">
          <div className="row">
            {this.renderMatchRow(firstEntry.entry_id, 
                                 firstEntry.entry_name, 
                                 selectedWeek, finished, 
                                 match.league_entry_1_points, 
                                 picks, 
                                 live)}
            {this.renderMatchRow(secondEntry.entry_id, 
                        secondEntry.entry_name, 
                        selectedWeek, finished, 
                        match.league_entry_2_points, 
                        picks, 
                        live)}
          </div>
        </div>
      </div>
    );
  }
}

export default Match;