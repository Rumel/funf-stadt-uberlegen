import React, { Component } from 'react';
import _ from 'lodash';
import Match from "./match";
import { Dropdown } from "react-bootstrap";

class MatchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedWeek: 1
    };
  }

  getAllEvents = (matches) => {
    const startedMatches = _.filter(matches, (m) => { return m.started === true });
    const allIds = _.map(startedMatches, (sm) => { return sm.event});
    const uniqueIds = _.uniq(allIds);
    const sorted = uniqueIds.sort().reverse();

    return sorted;
  }

  changeGameWeek = (value) => {
    this.setState({selectedWeek: value});
  }

  render() {
    const { matches, entries } = this.props;

    const currentMatches = _.filter(matches, (m) => m.event === this.state.selectedWeek);
    const events = this.getAllEvents(matches);

    return(
      <div className="row">
          <div className="col-12">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Gameweek Change
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {events.map((e) => {
                return (
                  <Dropdown.Item key={e} onClick={() => this.changeGameWeek(e)}>{e}</Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-12">
          <p className="game-week-text">Game Week {this.state.selectedWeek}</p>
        </div>
        {currentMatches.map((m) => {
          return (
            <Match match={m} entries={entries} key={`${m.league_entry_1}-${m.league_entry_2}`} />
          );
        })}
      </div>
    );
  }
}

export default MatchContainer;