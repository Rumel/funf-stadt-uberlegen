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

  calculateResult(first, second) {
    if(first > second) {
      return "W";
    } else if ( second > first) {
      return "L";
    } else {
      return "D";
    }
  }

  renderTeamForm(entry, matches, filteredRange) {
    const { id } = entry;

    const lastMatches = matches.filter((m) => { 
      return filteredRange.includes(m.event) && (m.league_entry_1 === id || m.league_entry_2 === id) 
    });

    const teamForm = [];

    _.each(lastMatches, (m) => {
      if(m.league_entry_1 === id) {
        teamForm.push(this.calculateResult(m.league_entry_1_points, m.league_entry_2_points));
      } else {
        teamForm.push(this.calculateResult(m.league_entry_2_points, m.league_entry_1_points));
      }
    })

    return teamForm.map((f, index) => {
      if(f === "W") {
        return (<span key={index} className="form-icon form-win">W</span>);
      } else if (f === "L") {
        return (<span key={index} className="form-icon form-loss">L</span>);
      } else {
        return (<span key={index} className="form-icon form-draw">D</span>);
      }
    });
  }

  render() {
    const { matches, currentWeek } = this.props;

    if(!this.props.standings || !this.props.picks  || !this.props.bootstrap || !this.props.matches) {
      return null;
    }

    let filteredRange = [];
    if(this.props.matches && this.props.matches.length) {
      const latestMatch = _.find(matches, (m) => { return m.event === currentWeek });
      const lastFinishedWeek = latestMatch.finished ? currentWeek : currentWeek - 1;
      const unfilteredRange = _.range(lastFinishedWeek - 4, lastFinishedWeek + 1);
      filteredRange = _.filter(unfilteredRange, (x) =>  x > 0);
    }
    
    return (
      <div className="row standings-box">
        <div className="col-12 standings-header-row">
          <div className="row">
            <div className="col">#</div>
            <div className="col-5 text-left">Club</div>
            <div className="col d-none d-sm-block">W</div>
            <div className="col d-none d-sm-block">L</div>
            <div className="col d-none d-sm-block">D</div>
            <div className="col-2">+</div>
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
                <div className="col-5 text-left">
                  <div className="row">
                    <div className="col-12">
                      <a href={this.getTeamLink(entry.entry_id, this.props.currentWeek)} target="_blank" rel="noopener noreferrer">
                        <span className="standings-team-name ellipsis">
                          {entry.entry_name}
                        </span>
                      </a>
                    </div>
                    <div className="col-12 ellipsis">
                      <span className="standings-player-name">{entry.player_first_name} {entry.player_last_name}</span>
                    </div>
                    {filteredRange.length ? (
                      <div className="col-12">
                        {this.renderTeamForm(entry, matches, filteredRange)}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col d-none d-sm-block">{row.matches_won}</div>
                <div className="col d-none d-sm-block">{row.matches_lost}</div>
                <div className="col d-none d-sm-block">{row.matches_drawn}</div>
                <div className="col-2">{row.points_for}</div>
                <div className="col">{row.total}</div>
              </div>
              {/* Break this out into own compenent table*/}
              {this.state.standingVisiblity[index] ? 
                (
                  <div>
                    <div className="row bold d-sm-none d-lg-none d-xl-none">
                      <div className="col-4">
                        <span>W</span>
                      </div>
                      <div className="col-4">
                        <span>L</span>
                      </div>
                      <div className="col-4">
                        <span>D</span>
                      </div>
                    </div>
                    <div className="row d-sm-none d-lg-none d-xl-none">
                      <div className="col-4">
                        <span>{row.matches_won}</span>
                      </div>
                      <div className="col-4">
                        <span>{row.matches_lost}</span>
                      </div>
                      <div className="col-4">
                        <span>{row.matches_drawn}</span>
                      </div>
                    </div>
                    <div className="row"
                        onClick={() => this.rowClick(index)}>
                      {picks.map(pick => {
                        const { elements, element_types, teams} = this.props.bootstrap;
                        const elem = _.find(elements, e => e.id === pick);
      
                        return (
                          <div className="col-12 text-xs-center col-sm-6 text-sm-right col-lg-4" key={pick}>
                            <p className="small-margin-bottom">
                              {elem.web_name} - ({this.getType(element_types, elem.element_type)}) - {this.getTeam(teams, elem.team)} - {elem.form}
                            </p>
                          </div>
                        );
                      })}
                    </div>
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