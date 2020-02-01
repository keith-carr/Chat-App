import React from 'react';
import firebase from '../../../firebase';
import {Menu, Icon} from 'semantic-ui-react';
import ComponentType from '../../../ComponentType';
import {connect} from 'react-redux';
import {setCurrentChannel, setPrivateChannel} from '../../../store/actions';
import { any } from 'prop-types';

type UserType = {status: string, name: string, uid: string };

interface IProps {
    currentUser:UserType,
    setCurrentChannel?:any,
    setPrivateChannel?:any,
}

class DirectMessages extends ComponentType<IProps> {

    state = {
        activeChannel: '',
        user: this.props.currentUser,
        users: [], 
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence')
    }

    componentDidMount() {
        if(this.state.user) {
            this.addListeners(this.state.user.uid);
        }
    }

    addListeners = (currentUserUid:string) => {
        let loadedUsers: Array<object> = [];
        this.state.usersRef.on('child_added', (snap:any ) => {
            if(currentUserUid !== snap.key) {
                let user = snap.val();
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                this.setState({users: loadedUsers});
            }
        })

        this.state.connectedRef.on('value', snap => {
            if(snap.val() === true) {
                const ref = this.state.presenceRef.child(currentUserUid);
                ref.set(true);
                ref.onDisconnect().remove((err) => {

                })
            }
        })

        this.state.presenceRef.on('child_added', (snap: any) => {
            if(currentUserUid !== snap.key) {
                this.addStatusToUser(snap.key);
            }
        });
        this.state.presenceRef.on('child_removed', (snap: any) => {
            if(currentUserUid !== snap.key) {
                this.addStatusToUser(snap.key, false);
            }
        });
    }

    addStatusToUser = ( userId: string, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc:any, user:{uid: string, status: string}) => {
            if(user.uid === userId) {
                user['status'] = `${connected ? 'online' : 'offline'}`;
            }
            return acc.concat(user);
        }, []);
        this.setState({users: updatedUsers});
    }

    isUserOnline = (user:UserType) => user.status === 'online'
    
    // Each user is still considered a channel, so here we use user id for reference to change channels
    changeChannel = (user:UserType) => {
        const channelId = this.getChannelId(user.uid);
        const channelData = {
            id: channelId,
            name: user.name
        }
        this.props.setCurrentChannel(channelData);
        this.props.setPrivateChannel(true);
        this.setActiveChannel(user.uid);
    }

    getChannelId = (userId:string) => {
        const currentUserId = this.state.user.uid;
        return userId < currentUserId ?
         `${userId}/${currentUserId}` : `${currentUserId}/${userId}`;
    }

    setActiveChannel = (userId: string) => {
        this.setState({ activeChannel: userId });
    }

    render() {
        const { users, activeChannel } = this.state;
        return (
            <Menu.Menu className='menu'>
                <Menu.Item>
                    <span>
                        <Icon name='mail' /> DIRECT MESSAGES
                    </span>{' '}
                    ({ users.length })
                </Menu.Item>
                {/* Users to send Direct Messages */}
                {users.map((user:UserType) => (
                    <Menu.Item
                        key={user.uid}
                        active={user.uid === activeChannel}
                        onClick={() => this.changeChannel(user)}
                        style={{opacity: 0.7, fontStyle: 'italic'}}
                    >
                        <Icon 
                            name="circle"
                            color={this.isUserOnline(user) ? 'green' : 'red'}
                        />
                        @ {user.name}    
                        </Menu.Item>
                ))}
            </Menu.Menu>
        )
    }
}
export default connect<any, any>(null, {setCurrentChannel, setPrivateChannel})(DirectMessages);