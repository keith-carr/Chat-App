import React from 'react'; 
import { Menu, Icon, Modal, Input, Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import firebase from '../../../firebase';

import * as actions from '../../../store/actions';

import {connect} from 'react-redux';
import {Store} from '../../App';

type InputEvent = React.FormEvent<HTMLInputElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;
type User = {displayName:string, photoURL:string};
type Channel = {id:number, name:string};

interface IState {
        user:User,
        channels:[Channel],
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
    onSetCurrentChannel?:any,
    setActiveChannel?:() => void
}

export class Channels extends React.Component<IProps> {
    state:IState = {
        user: this.props.currentUser,
        channels: [{id:0, name:''}], // ?????????? ---- COULD CAUSE PROBLEMS IN CHANNEL SWITCHING //
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        isModalOpen:false,
        firstLoad: true,
        activeChannel: '',
    }
    componentDidMount() {
        this.addListenters();
    }

    addListenters() {
        let loadedChannels:[object] = [{}];  
        this.state.channelsRef.on('child_added', (snap:{val:()=>object}) =>{
            loadedChannels.push( snap.val() );
            this.setState({channels: loadedChannels}, () => this.setFirstChannel());
        });
    }

    removeListeners = ():void => {
        this.state.channelsRef.off();
    }

    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if(this.state.firstLoad && this.state.channels.length > 0) {
            this.props.onSetCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel) ;
        }
        this.setState({firstLoad: false});
    }

    changeChannel = (channel:Channel) => {
        this.props.onSetCurrentChannel(channel);
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
            <>
            <Menu.Menu style={{paddingBottom: '2em'}}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANNELS
                    </span>{' '}
                    ({channels.length}) <Icon name="add" onClick={this.openModal} /> 
                </Menu.Item>
                {this.displayChannels(channels)}
            </Menu.Menu>
            <Modal basic open={isModalOpen} onClose={this.closeModal}>
                <Modal.Header>
                    Add a Channel
                </Modal.Header>
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
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button data-test="add-btn" color="green" inverted onClick={this.addChannel}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted>
                        <Icon name="remove" onClick={this.closeModal} /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            </>
        )
    }
}

// const mapStateToProps = () => {

// }
const mapDispatchToProps = (dispatch:any) => {
    return {
        onSetCurrentChannel: (channel:any) => dispatch(actions.setCurrentChannel(channel)),
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//       onLoginSuccess: userId => dispatch(actions.loginSuccess(userId)),
//       onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
//     };
//   };

export default connect<any, any, Store>(null, mapDispatchToProps)(Channels);