import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Train', '28 Days');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Train', '28 Days')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Train', '28 Days'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Train', '28 Days')
            }));
        });
    });

    describe('next', () => {
        it('takes the next pair of entries under vote', () => {
            const state = Map({
                entries: List.of('Train', '28 Days', 'Sunshine')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Train', '28 Days')
                }),
                entries: List.of('Sunshine')
            }));
        });

        it('puts winner back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Train', '28 Days'),
                    tally: Map({
                        'Train': 3, 
                        '28 Days': 2
                    })
                }),
                entries: List.of('Sunshine', 'Minions')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Minions')
                }),
                entries: List.of('Train')
            }));
        });

        it('puts tied entries back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Train', '28 Days'),
                    tally: Map({
                        'Train': 3, 
                        '28 Days': 3
                    })
                }),
                entries: List.of('Sunshine', 'Minions')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Minions')
                }),
                entries: List.of('Train', '28 Days')
            }));
        });

        it('marks winner when only 1 entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Train', '28 Days'),
                    tally: Map({
                        'Train': 3, 
                        '28 Days': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Train'
            }));
        });
    });

    describe('vote', () => {
        it('creates tally for new vote', () => {
            const state = Map({
                    pair: List.of('Train', '28 Days')
            });
            const nextState = vote(state, 'Train');
            expect(nextState).to.equal(Map({
                    pair: List.of('Train', '28 Days'),
                    tally: Map({
                        'Train': 1
                    })
            }));
        });

        it('increments tally for ongoing vote', () => {
            const state = Map({
                    pair: List.of('Train', '28 Days'),
                    tally: Map({
                        'Train': 3, 
                        '28 Days': 2
                    })
            });
            const nextState = vote(state, '28 Days');
            expect(nextState).to.equal(Map({
                    pair: List.of('Train', '28 Days'),
                    tally: Map({
                        'Train': 3, 
                        '28 Days': 3
                    })
            }));
        });
    });
});