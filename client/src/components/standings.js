import React, { Component } from 'react';
import _ from "lodash";

class Standings extends Component {
  render() {
    if(this.props.standings === null) {
      return null;
    }

    const league_size = this.props.standings.length;
    
    return (
      <div className="row">
        <div className="col-12 standings-header-row">
          <div className="row">
            <div className="col">#</div>
            <div className="col-6 text-left">Club</div>
            <div className="col d-none d-sm-block">W</div>
            <div className="col d-none d-sm-block">D</div>
            <div className="col d-none d-sm-block">L</div>
            <div className="col">+</div>
            <div className="col">Pts</div>
          </div>
        </div>
        {this.props.standings.map((row, index) => {
          const entry = _.find(this.props.entries, (x) => x.id === row.league_entry);
          
          return (
            <div className={`col-12 league-row ${ league_size - 1 !== index ? "league-row-bottom-border" : ""}`} key={row.league_entry}>
              <div className="row align-items-center">
                <div className="col standings-rank-text">{row.rank}</div>
                <div className="col-6 text-left">
                  <p className="standings-team-name">{entry.entry_name}</p>
                  <p className="standings-player-name">{entry.player_first_name} {entry.player_last_name}</p>
                </div>
                <div className="col d-none d-sm-block">{row.matches_won}</div>
                <div className="col d-none d-sm-block">{row.matches_lost}</div>
                <div className="col d-none d-sm-block">{row.matches_drawn}</div>
                <div className="col">{row.points_for}</div>
                <div className="col">{row.total}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Standings;