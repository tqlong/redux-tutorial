import React from 'react';
import {connect} from 'react-redux';

import Winner from "./Winner"

export class Results extends React.PureComponent {
    getPair() {
        return this.props.pair || [];
    }

    getVotes(entry) {
        return (this.props.tally && this.props.tally.has(entry)) ?
            this.props.tally.get(entry) : 0;
    }

    hasWinner() {
        return !!this.props.winner;
    }

    render() {
        return this.hasWinner() ?
        <Winner ref="winner" winner={this.props.winner} /> :        
        <div className="results">
            <div className="tally">
            {this.getPair().map(entry => 
                <div key = {entry} className="entry">
                    <h1>{entry}</h1>
                    <div className="voteCount">{this.getVotes(entry)}</div>
                </div>
            )}
            </div>
            <div className="management">
                <button ref="next" className="next" onClick={this.props.next}>
                    Next
                </button>
            </div>
        </div>;
    }

};

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        tally: state.getIn(['vote', 'tally']),
        winner: state.get(['winner']),
    }
}

export const ResultsContainer = connect(mapStateToProps)(Results);