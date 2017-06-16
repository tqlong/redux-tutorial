import React from 'react';

import Winner from "./Winner"

export default class Results extends React.PureComponent {
    getPair() {
        return this.props.pair || [];
    }

    getVotes(entry) {
        return (this.props.tally && this.props.tally.has(entry)) ?
            this.props.tally.get(entry) : 9;
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