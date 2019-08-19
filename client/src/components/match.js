import React, { Component } from 'react';
import _ from "lodash";

class Match extends Component {
  getTeamLink = (entryId, gameWeek) => {
    return `https://draft.premierleague.com/entry/${entryId}/event/${gameWeek}`;
  }

  calculatePoints(entryId, currentWeek, selectedWeek, entryPoints, picks, live) {
    if (currentWeek !== selectedWeek) {
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

  render() {
    const { match, entries, picks, picksLoaded, currentWeek, selectedWeek, live } = this.props;

    if(currentWeek === selectedWeek && (!picksLoaded || !live)) {
      return null;
    }

    const firstEntry = _.find(entries, (e) => e.id === match.league_entry_1);
    const secondEntry = _.find(entries, (e) => e.id === match.league_entry_2);

    return(
      <div className="col-12 col-md-6">
        <div className="match-box">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-9 text-left">
                  <a href={this.getTeamLink(firstEntry.entry_id, selectedWeek)} target="_blank" rel="noopener noreferrer">
                    <p className="match-team-text">
                      {firstEntry.entry_name}
                    </p>
                  </a>
                </div>
                <div className="col-3">
                  <p className="match-score-text">
                    {this.calculatePoints(firstEntry.entry_id, currentWeek, selectedWeek, match.league_entry_1_points, picks, live)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-9 text-left">
                  <a href={this.getTeamLink(secondEntry.entry_id, selectedWeek)} target="_blank" rel="noopener noreferrer">
                    <p className="match-team-text">
                      {secondEntry.entry_name}
                    </p>
                  </a>
                </div>
                <div className="col-3">
                <p className="match-score-text">
                  {this.calculatePoints(secondEntry.entry_id, currentWeek, selectedWeek, match.league_entry_2_points, picks, live)}
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Match;