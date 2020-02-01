import React, { FormEventHandler, Component } from "react";
import { shallow, mount, EnzymePropSelector, EnzymeAdapter } from "enzyme";
import {setCurrentChannel} from '../../../store/actions';
import * as actionTypes from  '../../../store/actions'
import {
  findByTestAttr,
  storeFactory,
  IWrapper
} from "../../../../test/testUtils";

import ConnectedChannels, { Channels, INewChannel } from "./Channels";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<ConnectedChannels store={store} />).dive();
  console.log(wrapper.debug());

  return wrapper;
};

const setupNewChannel = (Component:any,props = {}, state:object) => {
  const wrapper = shallow(<Component {...props} />);
  if(state) wrapper.setState(state);
  return wrapper;
}
const setupProps = (Component:any, props = {}, state:{}) => {
  const wrapper = shallow(<Component {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};


describe("after clicking on ADD BUTTON", () => {
  let wrapper: IWrapper;
  const store = storeFactory();
  const initialState:INewChannel = {
    id: 'yoyoyoyoyo',
    name: 'MyNewChannel',
    details: 'NA',
    createdBy: {
      name: 'Kyle',
      avatar: 'na/na/na/na',
    }
  }
  const initialChannelState = {currentChannel:{channel:{id: 123456, name:'last one'}}};
  const addedChannelMock = jest.fn();
  const defaultProps = {
    addChannel: addedChannelMock,
  }

  beforeEach(() => {
    wrapper = setupNewChannel(Channels, defaultProps, initialState);  
  });
    
  test("add channels", () => {
    let addBtnComponent = findByTestAttr(wrapper, "add-btn");
    const channelName = wrapper.instance().state.name;
    // wrapper = setupNewChannel(ConnectedChannels, initialState);
    console.log("Added Channel Mock: ", addedChannelMock);
    addBtnComponent.simulate('click');
    
    expect(channelName).toBe(initialState.name);
  });

  beforeEach( () => {
    wrapper = setup();
  })

  test('addChannels() uses correct state', () => {
    
    store.dispatch(setCurrentChannel(initialChannelState));
    const newState = store.getState();
    // newState is pulling from the channel reducer object. 'currentChannel' is in the reducer.
    expect(newState).toBe('Jerry The Example');
  })

});