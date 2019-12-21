import React, { Component } from 'react';
import _ from "lodash";

class Match extends Component {
  getTeamLink = (entryId, gameWeek) => {
    return `https://draft.premierleague.com/entry/${entryId}/event/${gameWeek}`;
  }

  calculatePoints(entryId, finished, entryPoints, picks, live) {
    if (finished) {
      return entryPoints;
    } else {
      if(picks) {
        const elements = picks[entryId].slice(0,11).map(x => x.element);
        let points = 0;
  
        _.each(elements, elem => {
          points = points + live.elements[elem].stats.total_points;
        });
  
        return points;
      } else {
        return 0;
      }
    }
  }

  getPlayedPlayers(entryId, finished, picks, live, bootstrap) {
    if (finished) {
      return "";
    } else {
      if(picks) {
        const elements = picks[entryId].slice(0,11).map(x => x.element);

        // bootstrap.fixtures.find(function(x) {return x.team_a === temp1.elements[144].team}).started
  
        let count = 0;
        _.each(elements, elem => {
          const team = bootstrap.elements[elem - 1].team;
          const fixture = _.find(live.fixtures, (f) => { 
            return f.team_a === team || f.team_h === team
          });

          if(fixture && fixture.started) {
            count++;
          }
        });
  
        return ` (${count})`;
      } else {
        return "";
      }
    }
  }

  renderMatchRow(entryId, entryName, selectedWeek, finished, matchPoints, picks, live, bootstrap) {
    return (
      <div className="col-12">
        <div className="float-left text-left">
          <a href={this.getTeamLink(entryId, selectedWeek)} target="_blank" rel="noopener noreferrer">
            <span className="match-team-text">
              {entryName}
            </span>
          </a>
        </div>
        <div className="float-right">
          <span className="match-score-text">
            {this.calculatePoints(entryId, finished, matchPoints, picks, live)}
          </span>
          <span>
            {this.getPlayedPlayers(entryId, finished, picks, live, bootstrap)}
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { match, entries, picks, picksLoaded, currentWeek, selectedWeek, live, bootstrap } = this.props;

    if(currentWeek === selectedWeek && (!picksLoaded || !live)) {
      return null;
    }

    const firstEntry = _.find(entries, (e) => e.id === match.league_entry_1);
    const secondEntry = _.find(entries, (e) => e.id === match.league_entry_2);
    const { finished } = match;

    return(
      <div className="col-12 col-md-6">
        <div className="match-box">
          <div className="row">
            {this.renderMatchRow(firstEntry.entry_id, 
                                 firstEntry.entry_name, 
                                 selectedWeek,
                                 finished, 
                                 match.league_entry_1_points, 
                                 picks, 
                                 live,
                                 bootstrap)}
            {this.renderMatchRow(secondEntry.entry_id, 
                        secondEntry.entry_name, 
                        selectedWeek,
                        finished, 
                        match.league_entry_2_points, 
                        picks, 
                        live,
                        bootstrap)}
          </div>
        </div>
      </div>
    );
  }
}

export default Match;