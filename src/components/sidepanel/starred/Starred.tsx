import React, { useState } from "react";
import { Menu, Label, Icon } from "semantic-ui-react";
import { IChannel } from "../../App";
import { setPrivateChannel, setCurrentChannel } from "../../../store/actions";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import {INewChannel} from '../channels/Channels';
import ComponentType from '../../../ComponentType';

interface IProps {
  setCurrentChannel: (channel: object) => any,
  setPrivateChannel: (isPrivate: boolean) => any,
  currentUser: any,
}

class Starred extends ComponentType<IProps> {

  state = {
    starredChannels: [],
    activeChannel: {},
    openModal: false,
    usersRef: firebase.database().ref('users'),
    user: this.props.currentUser,
  }

  componentDidMount() {
    if(this.state.user) {
      this.addListeners(this.state.user.uid);
    }    
  }
  
  addListeners = (userId: string) => {
    // usersRef
    // .child(userId)
    // .child('starred')
    // .on('child_added', (snap: any) => {
    //     const starredChannel = {id: snap.key, ...snap.val() };
    //     setStarred([...starredChannels, starredChannel])
    // });
  
    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_added', (snap: any) => {
        const starredChannel = {id: snap.key, ...snap.val()};
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannel]});
      });
  
      this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_removed', (snap:any) => {
          const channelToRemove = { id: snap.key, ...snap.val() };
          const filteredChannels = this.state.starredChannels.filter( (channel:any) => {
            return channel.id !== channelToRemove.id;
          });
          this.setState({ starredChannels: filteredChannels});
      })
    //   usersRef
    // .child(userId)
    // .child('starred')
    // .on('child_removed', (snap: any) => {
    //     const channelToRemove = { id: snap.key, ...snap.val()};
    //     const filteredChannels = starredChannels.filter((channel: IChannel) => {
    //         return channel.id !== channelToRemove.id;
    //     });
    //     setStarred(filteredChannels);
    // });
  }

  setActiveChannel = (channel: IChannel) => this.setState({activeChannel: channel.id});

  changeChannel = (channel: IChannel) => {
    this.props.setCurrentChannel(channel);
    this.setActiveChannel(channel);
    this.props.setPrivateChannel(false);
  };

  displayChannels = (channels: Array<any>) => {
    let newChannels =
      channels.length > 0 &&
      channels.map((channel: any) => (
        <Menu.Item
          key={channel.id + channel.name}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activeChannel}
        >
          # {channel.name}
        </Menu.Item>
      ));
    return newChannels;
  };

  render() {

    const {starredChannels} = this.state;

    return (
      <>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="star" /> STARRED
            </span>{" "}
            ({starredChannels.length}) <Icon name="add" onClick={this.state.openModal} />
          </Menu.Item>
          {this.displayChannels(starredChannels)}
        </Menu.Menu>
      </>
    );
  }
};

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);

