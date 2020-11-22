import React, { FormEventHandler, Component } from "react";
import { shallow, mount, EnzymePropSelector, EnzymeAdapter } from "enzyme";
import {setCurrentChannel} from '../../../store/actions';
import * as actionTypes from  '../../../store/actions'
import {
  findByTestAttr,
  storeFactory,
  IWrapper
} from "../../../../test/testUtils";
import ComponentType from '../../../ComponentType';

import Starred from "./Starred";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Starred store={store} />).dive();
  // let MyContext = React.createContext<any>(Input);
  // const wrapper = mount(<Provider store={store}><Input /></Provider>);
  // const MyContext = React.createContext(Input);
  // const wrapper = shallow(<Provider store={store} context={MyContext}><Input context={MyContext} /></Provider>).dive();
  console.log(wrapper.debug());

  return wrapper;
};
