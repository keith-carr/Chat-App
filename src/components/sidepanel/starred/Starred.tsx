import React, { useState } from "react";
import { Menu, Label, Icon } from "semantic-ui-react";
import { IChannel } from "../../App";
import { setPrivateChannel, setCurrentChannel } from "../../../store/actions";
import { connect } from "react-redux";
import firebase from "firebase";

interface IProps {
  setCurrentChannel: (channel: object) => any;
  setPrivateChannel: (isPrivate: boolean) => any;
  currentUser: object;
}

const Starred = (props: IProps) => {
  const [starredChannels, setStarred] = useState<any>([]);
  const [activeChannel, setActive] = useState({});
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [usersRef, setUsersRef] = useState<any>(firebase.database().ref);
  const [user, setUser] = useState<any>(props.currentUser);

  React.useEffect(
    () => {
      if(user) {
        addListeners(user.uid);
      }
    }
  );

  const addListeners = (userId: number) => 
    usersRef
    .child(userId)
    .child('starred')
    .on('child_added', (snap: any) => {
        const starredChannel = {id: snap.key, ...snap.val() };
        setStarred([...starredChannels, starredChannel])
    })
  

  const setActiveChannel = (channel: IChannel) => setActive(channel);

  const changeChannel = (channel: IChannel) => {
    props.setCurrentChannel(channel);
    setActiveChannel(channel);
    props.setPrivateChannel(false);
  };

  const displayChannels = (channels: [object]) => {
    let newChannels =
      channels.length > 0 &&
      channels.map((channel: any) => (
        <Menu.Item
          key={channel.id + channel.name}
          onClick={() => changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === activeChannel}
        >
          # {channel.name}
        </Menu.Item>
      ));
    return newChannels;
  };

  return (
    <>
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>{" "}
          ({starredChannels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
        {displayChannels}
      </Menu.Menu>
    </>
  );
};

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
