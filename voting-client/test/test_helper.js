import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
const win = doc.window;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        //console.log("key =", key);
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);