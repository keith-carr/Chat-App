import React, { FormEventHandler } from "react";
import { shallow, mount, EnzymePropSelector, EnzymeAdapter } from "enzyme";

import {
  findByTestAttr,
  storeFactory,
  IWrapper
} from "../test/testUtils";

import Root from "./index";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Root store={store} />).dive();
  console.log(wrapper.debug());

  return wrapper;
};

/**
 * declare wrapper
 * declare and set mock function
 * before each test
 *    - set props to be passed in wrapper assignment
 *    - test instance of wrapper's componentDidMount Life Cycle
 */
describe('setUser', () => {
    let wrapper:any;
    let setUserMock = jest.fn();
    beforeEach(() => {
        let props = {
            setUser: setUserMock
        }
        wrapper = shallow(<Root {...props} />);
    })
    it('will call with an actual value', () => {
        wrapper.instance().componentDidMount();
        let setUserMockCalls = setUserMock.mock.calls;
       expect(setUserMockCalls).toEqual([]);
    })
});
