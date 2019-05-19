import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, storeFactory, IWrapper } from '../../../../test/testUtils';
import ConnectedRegister, {Register} from './Register';


const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<ConnectedRegister store={store} />).dive();
    // let MyContext = React.createContext<any>(Input);
    // const wrapper = mount(<Provider store={store}><Input /></Provider>);
    // const MyContext = React.createContext(Input);
    // const wrapper = shallow(<Provider store={store} context={MyContext}><Input context={MyContext} /></Provider>).dive();
    console.log(wrapper.debug()); 

    return wrapper;
}
test ('renders the form', () => {
    let wrapper:IWrapper;
    wrapper = setup();
    let formComponent = findByTestAttr(wrapper, 'form-component');
    expect(formComponent.length).toBe(1);
});

describe('when submit button clicked', () => {
    let wrapper:any
    let usernameMock:any;
    beforeEach(() => {
        usernameMock = jest.fn();
        const props = {
            username: usernameMock,
            email: 'test@gmail.com',
            password: 'testpassword',
            passwordConfirmation: 'testpassword'
        }
        wrapper = shallow(<Register {...props} />);
        
        const btnComponent = findByTestAttr(wrapper, 'component-submit-btn');
        btnComponent.simulate('click');
    });
    // test('how many times username is submitted ', () => {
    //     const usernameCallCount = usernameMock.mock.calls.length;
    //     expect(usernameCallCount).toBe(1);
    })
