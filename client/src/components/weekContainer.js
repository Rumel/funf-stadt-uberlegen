import React, { Component } from 'react';
import _ from 'lodash';
import Match from "./match";
import { Dropdown } from "react-bootstrap";
import Transactions from './transactions';
import axios from 'axios';

class WeekContainer extends Component {
  constructor(props) {
    super(props);

    const selectedWeek = this.getAllEvents(props.matches);

    this.state = {
      selectedWeek: selectedWeek[0],
      transactions: null,
      fixturesActive: true,
      transfersActive: false
    };
  }

  componentWillMount() {
    axios.get(`/transactions/${this.props.settings.leagueId}`)
    .then(res => {
      const { data } = res;

      console.log(`Transactions: ${this.props.settings.leagueId}`);
      console.log(data);

      this.setState({
        transactions: data.transactions
      });
    });
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

  setActiveContainer = (type) => {
    if(type === "fixtures") {
      this.setState({
        fixturesActive: true,
        transfersActive: false
      });
    } else if(type === "transfers") {
      this.setState({
        fixturesActive: false,
        transfersActive: true
      });
    }
  }

  render() {
    const { matches, entries, picks, picksLoaded, currentWeek, live } = this.props;

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
        <div className="col-12">
          <div className="btn-group container-selector">
            <button type="button" 
                    class={`btn btn-secondary ${this.state.fixturesActive ?  "active" : ""}`}
                    onClick={() => this.setActiveContainer("fixtures")}>
              Fixtures
            </button>
            <button type="button" 
                    class={`btn btn-secondary ${this.state.transfersActive ?  "active" : ""}`}
                    onClick={() => this.setActiveContainer("transfers")}>
              Transfers
            </button>
          </div>
        </div>
        {/* This needs to be moved into it's own Component */}
        {this.state.fixturesActive ? 
          currentMatches.map((m) => {
            return (
              <Match match={m} 
                    entries={entries} 
                    key={`${m.league_entry_1}-${m.league_entry_2}`} 
                    picks={picks}
                    picksLoaded={picksLoaded}
                    currentWeek={currentWeek}
                    selectedWeek={this.state.selectedWeek}
                    live={live} />
            );
          })
         : null}
        {this.state.transfersActive ? (
          <Transactions selectedWeek={this.state.selectedWeek} 
                        transactions={this.state.transactions}
                        bootstrap={this.props.bootstrap}
                        entries={entries} />
        ) : null }

      </div>
    );
  }
}

export default WeekContainer;