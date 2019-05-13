import moxios from 'moxios';


/* Async actions can be made with store.dispatch() and with actions that use asynchronicity. The store.dispatch returns a promise.
   After promise resolves the test will run in the .then() as a callback
  
 */
describe('getSecretWord action creator', () => {
    beforeEach(() =>{
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('adds response word to state', () => {

    });
    
});