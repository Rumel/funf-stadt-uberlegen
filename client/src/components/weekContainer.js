import React, { Component } from 'react';
import _ from 'lodash';
import { Dropdown } from "react-bootstrap";
import Transactions from './transactions';
import axios from 'axios';
import MatchContainer from './matchContainer';

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
    const sorted = _.sortBy(uniqueIds, (id) => { return id; }).reverse();

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
    const { matches, entries, picks, picksLoaded, currentWeek, live, bootstrap } = this.props;
    const events = this.getAllEvents(matches);

    return(
      <div className="row">
        <div className="col-12">
          <p className="game-week-text">Game Week {this.state.selectedWeek}</p>
        </div>
        <div className="col-12 container-selector">
          <div className="btn-group float-left fixture-transfer-selector">
            <button type="button" 
                    className={`btn btn-secondary ${this.state.fixturesActive ?  "active" : ""}`}
                    onClick={() => this.setActiveContainer("fixtures")}>
              Fixtures
            </button>
            <button type="button" 
                    className={`btn btn-secondary ${this.state.transfersActive ?  "active" : ""}`}
                    onClick={() => this.setActiveContainer("transfers")}>
              Transfers
            </button>
          </div>
          <Dropdown className="gameweek-dropdown align-middle float-right">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Gameweek
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
        {/* This needs to be moved into it's own Component */}
        {this.state.fixturesActive ? 
          <MatchContainer matches={matches} 
            entries={entries} 
            picks={picks}
            picksLoaded={picksLoaded}
            currentWeek={currentWeek}
            selectedWeek={this.state.selectedWeek}
            live={live}
            bootstrap={bootstrap} />
         : null}
        {this.state.transfersActive ? (
          <Transactions selectedWeek={this.state.selectedWeek} 
                        transactions={this.state.transactions}
                        bootstrap={bootstrap}
                        entries={entries} />
        ) : null }

      </div>
    );
  }
}

export default WeekContainer;