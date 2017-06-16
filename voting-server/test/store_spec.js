import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store'

describe('store', () => {
    it('is a redux store configure with correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).to.equal(Map());

        store.dispatch({type: 'SET_ENTRIES', entries:['Train', '28 days']});
        expect(store.getState()).to.equal(fromJS({
            entries: ['Train', '28 days']
        }));
    });
});
