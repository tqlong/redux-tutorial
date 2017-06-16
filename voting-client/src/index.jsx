console.log('I am alive!');

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Voting from './components/Voting';
import Results from './components/Results';

import {List, Map} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');
const tally = Map({'Trainspotting': 5, '28 Days Later': 4});

class VotingWarper extends React.PureComponent {
    render() {
        return <Voting pair={pair} hasVoted="Trainspotting"/>;
    }
};

class ResultsWarper extends React.PureComponent {
    render() {
        return <Results pair={pair} 
                    tally={tally} 
                    winner="Trainspotting"
                    next={()=>console.log("Next clicked")}/>;
    }
};

const Main = () => ( 
    <main>
        <Switch>
            <Route path="/results" component={ResultsWarper} />
            <Route path="/" component={VotingWarper} />
        </Switch>
    </main>
);

ReactDOM.render(
    <HashRouter>
        <Main />
    </HashRouter>,
    document.getElementById('app')
)