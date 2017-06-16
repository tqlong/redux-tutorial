import React from 'react';

import Winner from './Winner'
import Vote from './Vote'

export default class Voting extends React.PureComponent {
    hasWinner() {
        return !!this.props.winner;
    }

    render() {
        return <div>
            { 
            this.hasWinner() ? 
            <Winner ref="winner" winner={this.props.winner}/> :
            <Vote {...this.props} />
            }
        </div>;
    }
};