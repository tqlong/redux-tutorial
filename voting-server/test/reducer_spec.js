import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const state = Map();
        const action = {type: 'SET_ENTRIES', entries: ['Train']};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Train']
        }));
    });

    it('handles VOTE', () => {
        const state = fromJS({
            vote: {
                pair: ['Train', '28 Days']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Train'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Train', '28 Days'],
                tally: {'Train': 1}
            },
            entries: []
        }));
    })

    it('handles NEXT', () => {
        const state = fromJS({
            vote: {
                pair: ['Train', '28 Days'],
                tally: {'Train': 1}
            },
            entries: []
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            winner: 'Train'
        }));
    });

    it('handles undefined initial state', () => {
        const state = undefined;
        const action = {type: 'SET_ENTRIES', entries: ['Train']};
        const nextState = reducer(state, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Train']
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Train', '28 Days']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Train'},
            {type: 'VOTE', entry: '28 Days'},
            {type: 'VOTE', entry: 'Train'},
            {type: 'VOTE', entry: 'Train'},
            {type: 'VOTE', entry: 'Train'},
            {type: 'VOTE', entry: '28 Days'},
            {type: 'VOTE', entry: '28 Days'},
            {type: 'NEXT'},
        ];
        const finalState = actions.reduce(reducer, Map());
        expect(finalState).to.equal(fromJS({
            winner: 'Train'
        }));
    });
});