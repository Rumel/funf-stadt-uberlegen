import React, { Component } from 'react';
import _ from "lodash";

class Match extends Component {
  getTeamLink = (entryId, gameWeek) => {
    return `https://draft.premierleague.com/entry/${entryId}/event/${gameWeek}`;
  }

  render() {
    const { match, entries } = this.props;

    const firstEntry = _.find(entries, (e) => e.id === match.league_entry_1);
    const secondEntry = _.find(entries, (e) => e.id === match.league_entry_2);

    return(
      <div className="col-12 col-sm-6">
        <div className="match-box">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-9 text-left">
                  <p>
                    <a href={this.getTeamLink(firstEntry.entry_id, match.event)} target="_blank" rel="noopener noreferrer">
                      {firstEntry.entry_name}
                    </a>
                  </p>
                </div>
                <div className="col-3">
                  <p>{match.league_entry_1_points}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-9 text-left">
                  <p>
                    <a href={this.getTeamLink(secondEntry.entry_id, match.event)} target="_blank" rel="noopener noreferrer">
                      {secondEntry.entry_name}
                    </a>
                  </p>
                </div>
                <div className="col-3">
                  <p>{match.league_entry_2_points}</p>
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