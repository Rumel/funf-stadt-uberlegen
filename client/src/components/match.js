import React, { Component } from 'react';
import _ from "lodash";

class Match extends Component {
  constructor(props) {
    super(props);
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
                  <p>{firstEntry.entry_name}</p>
                </div>
                <div className="col-3">
                  <p>{match.league_entry_1_points}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-9 text-left">
                  <p>{secondEntry.entry_name}</p>
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