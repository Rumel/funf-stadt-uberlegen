import React, { Component } from 'react';
import Octicon, {Check, X, ArrowLeft, ArrowRight} from '@primer/octicons-react'
import _ from "lodash";

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTransfers: false
    }
  }

  getPlayer(bootstrap, id) {
    return _.find(bootstrap.elements, (x) => { return x.id === id});
  }

  getTeamEntry(entries, id) {
    return _.find(entries, (e) => { return e.entry_id === id});
  }

  getType(types, id) {
    return _.find(types, (t) => t.id === id).singular_name_short;
  }

  getTeam(teams, id) {
    return _.find(teams, (t) => t.id === id).short_name;
  }

  onClickTranfers = () => {
    this.setState({
      showTransfers: !this.state.showTransfers
    });
  }

  renderTransferSpot(bootstrap, player, transferIn) {
    return (
      <div className={`col-6 ${transferIn ? "text-right" : "text-left"}`}>
        {transferIn ? null : (
          <div className="inline-block transactions-small-padding ">
            <Octicon icon={ArrowRight} size="medium" className="transaction-out" />
          </div>
        )}
        <div className="inline-block transactions-small-padding ">
          <div className="transactions-upper-row">
            <span>{player.web_name}</span>
          </div>
          <div className="transactions-lower-row">
            <span>({this.getType(bootstrap.element_types, player.element_type)})</span>
            <span>{this.getTeam(bootstrap.teams, player.team)}</span>
          </div>
        </div>
        {transferIn ? (
          <div className="inline-block transactions-small-padding ">
            <Octicon icon={ArrowLeft} size="medium" className="transaction-in" />
          </div>
        ) : null}
      </div>
    );
  }

  renderTransfer(transfer, bootstrap, entries) {
    const playerIn = this.getPlayer(bootstrap, transfer.element_in);
    const playerOut = this.getPlayer(bootstrap, transfer.element_out);

    return (
      <div key={transfer.id} className="col-12 col-md-6 transaction-row">
        <div className="row">
          <div className="col-10 text-center">
            <span className="transactions-team-name">
              {this.getTeamEntry(entries, transfer.entry).entry_name}
            </span>
          </div>
          <div className="col-2"></div>
          <div className="col-10">
            <div className="row no-gutters">
              {this.renderTransferSpot(bootstrap, playerIn, true)}
              {this.renderTransferSpot(bootstrap, playerOut, false)}
            </div>
          </div>
          <div className="col-2">
            {transfer.result === "a" ? 
              (<Octicon icon={Check} size="medium" className="transactions-check"/>): 
              (<Octicon icon={X} size="medium" className="transactions-x"/>)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { transactions, selectedWeek, bootstrap, entries } = this.props;

    if(!transactions || !bootstrap) {
      return null;
    }

    let selectedTransactions = _.filter(transactions, (t) => { return t.event === selectedWeek });
    selectedTransactions = _.sortBy(selectedTransactions, (t) => t.index);

    return (
      <div className="transactions-container">
        <div className="col-12 text-center">
          <p className="transactions-text">Transfers</p>
        </div>
        <div className="col-12 text-center">
          <span onClick={() => this.onClickTranfers()}>
            {this.state.showTransfers ? "Hide Transfers" : "Show Transfers"}
          </span>
        </div>
        {this.state.showTransfers ? (
          <div className="col-12">
            <div className="row">
              {selectedTransactions.map((t) => { return this.renderTransfer(t, bootstrap, entries); })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Transactions;