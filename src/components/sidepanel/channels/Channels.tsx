import React from 'react'; 
import { Menu, Icon, Modal, Input, Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import firebase from '../../../firebase';

import {setCurrentChannel} from '../../../store/actions';
import {connect} from 'react-redux';


type InputEvent = React.FormEvent<HTMLInputElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;
type User = {displayName:string, photoURL:string};

export interface Channel {id:number, name:string};

export interface INewChannel {
    id:string,
    name:string,
    details:string,
    createdBy: {
        name:string,
        avatar:string
    }
}

interface IState {
        user:User,
        channels:any,
        channelName:string,
        channelDetails:string,
        isModalOpen:boolean,
        channelsRef:any,
        firstLoad:boolean,
        activeChannel:string
}

interface IProps {
    currentUser:User,
    changeChannel?:(channel:object) => void,
    setCurrentChannel?:any,
    setActiveChannel?:() => void
}

class Channels extends React.Component<IProps> {
    state:IState = {
        user: this.props.currentUser,
        channels: [], // ?????????? ---- COULD CAUSE PROBLEMS IN CHANNEL SWITCHING //
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        isModalOpen:false,
        firstLoad: true,
        activeChannel: '',
    }
    componentWillMount() {
        this.addListenters();
        console.log("CHANNELS -> State channels: ", this.state.channels);
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListenters() {
        let loadedChannels:Array<object> = [];  
        this.state.channelsRef.on('child_added', (snap:{val:()=>object}) =>{
            loadedChannels.push( snap.val() );
            this.setState({channels: loadedChannels}, () => this.setFirstChannel());
        });
    }

    removeListeners = ():void => {
        this.state.channelsRef.off();
    }
///////////////////////////
    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if(this.state.firstLoad && this.state.channels.length > 0) {
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel) ;
        }
        this.setState({firstLoad: false});
    }
//////////////////////////////
    changeChannel = (channel:Channel) => {
        this.props.setCurrentChannel(channel);
        this.setActiveChannel(channel);
    }

   setActiveChannel = (channel:Channel) =>
    this.setState({activeChannel: channel.id})

    displayChannels = (channels:[object]) => (
        channels.length > 0 && channels.map( (channel:any) => (
            <Menu.Item
                key={channel.id+channel.name}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{opacity:0.7}}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}

            </Menu.Item>
        ))
    )
    /*Add */
    addChannel = () => {
        const {channelsRef, channelName, channelDetails, user} = this.state;
        // console.log('CHANNELREF.KEY: ', channelsRef.key);
        console.log('Firebase Database Ref: ', channelsRef);
        const key = channelsRef.push().key;
        // console.log('CONSOLE LOG KEY: ', key);
        console.log('USERNAME: ', user);
        const newChannel = {
            id:key,
            name:channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }
        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({channelName: '', channelDetails: ''});
                this.closeModal();
                console.log('channel added');
            })
            .catch( (error:Error) => {
                console.log('Catched Error:', error);
            })
    }

    handleSubmit = (event:FormEvent) => {
        event.preventDefault();
        if(this.isFormValid(this.state)) {
            console.log('channel added');
        }
    }
    openModal = () => this.setState({ isModalOpen: true });

    closeModal = () => this.setState({isModalOpen: false});
    
    handleChange = (event:InputEvent) => {
        this.setState({ [event.currentTarget.name]: event.currentTarget.value})
    }

    isFormValid = ({channelName, channelDetails}:IState) => channelName && channelDetails;
    render() {

        let {channels, isModalOpen} = this.state;
        return (
            <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={isModalOpen} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
        )
    }
}


export default connect<any, any>(
    null,
    { setCurrentChannel }
  )(Channels);
  
// const mapDispatchToProps = (dispatch:any) => {
//     return {
//         onSetCurrentChannel: (channel:any) => dispatch(actions.setCurrentChannel(channel)),
//     };
// }

// export default connect<any, any, Store>(null, mapDispatchToProps)(Channels);