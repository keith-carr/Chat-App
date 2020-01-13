import React, { FormEventHandler, Component } from "react";
import { shallow, mount, EnzymePropSelector, EnzymeAdapter } from "enzyme";
import {setCurrentChannel} from '../../../store/actions';
import * as actionTypes from  '../../../store/actions'
import {
  findByTestAttr,
  storeFactory,
  IWrapper
} from "../../../../test/testUtils";

import ConnectedStarred from "./Starred";

