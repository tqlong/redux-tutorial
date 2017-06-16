console.log('I am alive!');

import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

import {List, Map} from 'immutable';

import {createStore} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Sunshine', '28 Days Later'],
            tally: { 'Sunshine': 2 }
        },
        hasVoted: 'Sunshine'
    }
});

const Main = () => ( 
    <main>
        <Switch>
            <Route path="/results" component={ResultsContainer} />
            <Route path="/" component={VotingContainer} />
        </Switch>
    </main>
);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Main />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
)