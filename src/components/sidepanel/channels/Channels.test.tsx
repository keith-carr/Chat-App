import React, { FormEventHandler } from "react";
import { shallow, mount, EnzymePropSelector, EnzymeAdapter } from "enzyme";

import {
  findByTestAttr,
  storeFactory,
  IWrapper
} from "../../../../test/testUtils";

import ConnectedChannels, { Channels } from "./Channels";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<ConnectedChannels store={store} />).dive();
  console.log(wrapper.debug());

  return wrapper;
};

describe("after clicking on ADD BUTTON", () => {


  beforeEach(() => {
    let wrapper:IWrapper;
    wrapper = setup();
  
    test("add channels", () => {
      let wrapper: IWrapper;
      wrapper = setup();
      let addBtnComponent = findByTestAttr(wrapper, "add-btn");
      expect(addBtnComponent.length).toBe(1);
    });
  
  })

});
