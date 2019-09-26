import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import ColorPanel from './colorpanel/ColorPanel'; 
import SidePanel from './sidepanel/SidePanel';
import MetaPanel from './metapanel/MetaPanel'; 
import Messages from './messages/Messages';
import {connect} from 'react-redux';


interface Props {
  currentUser:{displayName:string}
}

export interface Store extends React.Props<any> {
  store?: any;
}


const App: React.FC = ({currentUser, currentChannel}:any) => {
  return (
    <Grid columns="equal" className="app" style={{background: '#eee'}}>
      <ColorPanel />
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser} />

      <Grid.Column style={{marginLeft: 320}}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />      
      </Grid.Column>
    </Grid>
    );
};
const mapStateToProps = (state:any):any => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel
}); 

export default connect(mapStateToProps)(App);
 