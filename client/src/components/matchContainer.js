import React, { Component } from 'react';
import _ from 'lodash';
import Match from "./match";

class MatchContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { matches, entries } = this.props;
    const selectedWeek = 1;

    const currentMatches = _.filter(matches, (m) => m.event === selectedWeek);

    return(
      <div className="row">
        <div className="col-12">
          <h4>Week Selector Row</h4>
        </div>
        {currentMatches.map((m) => {
          return (
            <Match match={m} entries={entries} />
          );
        })}
      </div>
    );
  }
}

export default MatchContainer;