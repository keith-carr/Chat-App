import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import ColorPanel from './colorpanel/ColorPanel'; 
import SidePanel from './sidepanel/SidePanel';
import MetaPanel from './metapanel/MetaPanel'; 
import Messages from './messages/Messages';

export class ComponentType<P = any, S = any> extends Component<P, S> {    

}

const App: React.FC = () => {
  return (
    <Grid columns="equal" className="app" style={{background: '#eee'}}>
      <ColorPanel />
      <SidePanel />

      <Grid.Column style={{marginLeft: 320}}>
        <Messages />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />      
      </Grid.Column>
    </Grid>
    );
}

export default App;
