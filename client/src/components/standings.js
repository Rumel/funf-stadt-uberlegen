import React, { Component } from 'react';
import _ from "lodash";

class Standings extends Component {
  constructor(props) {
    super(props);

    let visibility = [];
    const length = this.props.standings.length;

    for(let i = 0; i < length; i++) {
      visibility.push(false);
    }

    this.state = {
      standingVisiblity: visibility,
      leagueSize: length
    }
  }

  getColor(settings, index) {
    if(settings.promotion.indexOf(index + 1) > -1) {
      return "promotion";
    } else if (settings.possiblePromotion.indexOf(index + 1) > -1) {
      return "possible-promotion";
    } else if (settings.relegation.indexOf(index + 1) > -1) {
      return "relegation";
    } else if (settings.possibleRelegation.indexOf(index + 1) > -1) {
      return "possible-relegation";
    }

    return "";
  }

  getType(types, id) {
    return _.find(types, (t) => t.id === id).singular_name_short;
  }

  getTeam(teams, id) {
    return _.find(teams, (t) => t.id === id).short_name;
  }

  getTeamLink = (entryId, gameWeek) => {
    return `https://draft.premierleague.com/entry/${entryId}/event/${gameWeek}`;
  }

  rowClick(index) {
    const visibility = this.state.standingVisiblity;
    visibility[index] = !visibility[index];

    this.setState({
      standingVisiblity: visibility
    });
  }

  render() {
    if(!this.props.standings || !this.props.picks  || !this.props.bootstrap) {
      return null;
    }
    
    return (
      <div className="row standings-box">
        <div className="col-12 standings-header-row">
          <div className="row">
            <div className="col">#</div>
            <div className="col-6 text-left">Club</div>
            <div className="col d-none d-sm-block">W</div>
            <div className="col d-none d-sm-block">L</div>
            <div className="col d-none d-sm-block">D</div>
            <div className="col">+</div>
            <div className="col">Pts</div>
          </div>
        </div>
        {this.props.standings.map((row, index) => {
          const entry = _.find(this.props.entries, (x) => x.id === row.league_entry);
          const picks = _.map(this.props.picks[entry.entry_id], x => x.element);

          return (
            <div className={`col-12 league-row ${ this.state.leagueSize - 1 !== index ? "league-row-bottom-border" : ""} ${this.getColor(this.props.settings, index)}`} 
                 key={row.league_entry}>
              <div className="row align-items-center" 
                   onClick={() => this.rowClick(index)}>
                <div className="col standings-rank-text">{row.rank}</div>
                <div className="col-6 text-left"> 
                  <a href={this.getTeamLink(row.league_entry, this.props.currentWeek)} target="_blank" rel="noopener noreferrer">
                    <p className="standings-team-name">
                      {entry.entry_name}
                    </p>
                  </a>
                  <p className="standings-player-name">{entry.player_first_name} {entry.player_last_name}</p>
                </div>
                <div className="col d-none d-sm-block">{row.matches_won}</div>
                <div className="col d-none d-sm-block">{row.matches_lost}</div>
                <div className="col d-none d-sm-block">{row.matches_drawn}</div>
                <div className="col">{row.points_for}</div>
                <div className="col">{row.total}</div>
              </div>
              {this.state.standingVisiblity[index] ? 
                (
                  <div className="row"
                       onClick={() => this.rowClick(index)}>
                    {picks.map(pick => {
                      const { elements, element_types, teams} = this.props.bootstrap;
                      const elem = elements[pick];
    
                      return (
                        <div className="col-12 text-left" key={pick}>
                          <p>
                            {elem.first_name} {elem.web_name} - ({this.getType(element_types, elem.element_type)}) - {this.getTeam(teams, elem.team)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

            </div>
          );
        })}
        <div className="col-12">
          <div className="float-right">
            <div className="inline-block">
              <span className="relegation-box"></span>
              <span className="small-margin-right">Relegation</span>
            </div>
            <div className="inline-block">
              <span className="possible-relegation-box"></span>
              <span className="small-margin-right">Relegation play-off</span>
            </div>
            <div className="inline-block">
              <span className="possible-promotion-box"></span>
              <span className="small-margin-right">Promotion play-offs</span>
            </div>
            <div className="inline-block">
              <span className="promotion-box"></span>
              <span>Promotion</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Standings;