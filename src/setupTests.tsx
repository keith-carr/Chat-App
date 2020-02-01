   // ** JEST CONFIGURATION IS LOOKING FOR SETUPTESTS.JS in my case .tsx 
   
   // TIP It didnt work at first until i stopped the test and installed @types/jest

   // INSTALL both with and without @types/
   import Enzyme, { shallow } from 'enzyme';
   import EnzymeAdapter from 'enzyme-adapter-react-16';
   
   Enzyme.configure({adapter: new EnzymeAdapter(),
                     disableLifecycleMethods: true, });
   
 