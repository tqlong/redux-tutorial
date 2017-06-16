import React from 'react';
import {List, Map} from 'immutable';
import Voting from './Voting';

const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

export default class App extends React.PureComponent {
    render() {
        return <Voting pair={pair} tally = {tally} winner="Trainspotting"/>;
    }
};