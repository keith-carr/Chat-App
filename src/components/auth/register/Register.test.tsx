import React, { FormEventHandler } from "react";
import { shallow, mount, EnzymePropSelector, EnzymeAdapter } from "enzyme";

import {
  findByTestAttr,
  storeFactory,
  IWrapper
} from "../../../../test/testUtils";

import ConnectedRegister, { Register } from "./Register";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<ConnectedRegister store={store} />).dive();
  // let MyContext = React.createContext<any>(Input);
  // const wrapper = mount(<Provider store={store}><Input /></Provider>);
  // const MyContext = React.createContext(Input);
  // const wrapper = shallow(<Provider store={store} context={MyContext}><Input context={MyContext} /></Provider>).dive();
  console.log(wrapper.debug());

  return wrapper;
};

test("renders the form", () => {
  let wrapper: IWrapper;
  wrapper = setup();
  let formComponent = findByTestAttr(wrapper, "form-component");
  expect(formComponent.length).toBe(1);
});

const inputSetup = (Component:any, state:object) => {
  const wrapper = shallow(<Component />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe("Input Component ", () => {
  let wrapper: any;
  let componentInput: EnzymePropSelector;
  
  let initialState = {  username: 'testing',
                        email: 'test@gmail.com',
                        password: 'testPassword',
                        passwordConfirmation: 'testPassword' }; //initial state, to be sent to input 'email'
  let findInputUsername: any;
  
  const fakeEvent = { preventDefault: () => null }; // intercept event function call in handleSubmit

  beforeEach(() => {
    wrapper = inputSetup(Register, initialState);
    findInputUsername = () => findByTestAttr(wrapper, "username-input").prop("value");
  });
 
  test(" contains correct value as initital state", () => {
    const inputString = findInputUsername();
    expect(inputString).toBe(initialState.username);
  });
});
