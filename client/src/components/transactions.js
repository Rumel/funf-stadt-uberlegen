import React, { Component } from 'react';
import Octicon, {Check, X, ArrowLeft, ArrowRight} from '@primer/octicons-react'
import _ from "lodash";

class Transactions extends Component {
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
    return _.find(teams, (t) => t.id === id);
  }

  renderTransferSpot(bootstrap, player, transferIn) {
    const team = this.getTeam(bootstrap.teams, player.team);
    return (
      <div className="inline-block">
        {transferIn ? null : (
          <div className="inline-block transactions-small-padding align-middle">
            <Octicon icon={ArrowRight} size="medium" className="transaction-out" />
          </div>
        )}
        {transferIn ? null : (
          <div className="inline-block transactions-small-padding align-middle">
            <img src={`https://draft.premierleague.com/img/shirts/standard/shirt_${team.code}-36.png`}
                 alt={team.short_name}
                 className="team-image"/>
          </div>
        )}
        <div className="inline-block transactions-small-padding align-middle">
          <div className="transactions-upper-row block">
            <span>{player.web_name}</span>
          </div>
          <div className="transactions-lower-row block">
            <span>({this.getType(bootstrap.element_types, player.element_type)}) {team.short_name}</span>
          </div>
        </div>
        {transferIn ? (
          <div className="inline-block transactions-small-padding align-middle">
            <img src={`https://draft.premierleague.com/img/shirts/standard/shirt_${team.code}-36.png`}
                 alt={team.short_name}
                 className="team-image"/>
          </div>
        ) : null}
        {transferIn ? (
          <div className="inline-block transactions-small-padding align-middle">
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
      <div key={transfer.id} className="col-12 col-md-6 col-xl-4 transaction-row">
        <div className="row">
          <div className="col-12 text-center">
            <span className="transactions-team-name">
              {this.getTeamEntry(entries, transfer.entry).entry_name}
            </span>
          </div>
          <div className="col-12">
            {this.renderTransferSpot(bootstrap, playerIn, true)}
            {this.renderTransferSpot(bootstrap, playerOut, false)}
            <div className="inline-block transactions-small-padding align-middle">
              {transfer.result === "a" ? 
                (<Octicon icon={Check} size="medium" className="transactions-check"/>): 
                (<Octicon icon={X} size="medium" className="transactions-x"/>)}
            </div>
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
        <div className="col-12">
          <div className="row">
            {selectedTransactions.map((t) => { return this.renderTransfer(t, bootstrap, entries); })}
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;