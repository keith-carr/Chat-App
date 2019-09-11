import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';

import MessagesHeader from './messagesheader/MessagesHeader';
import MessageForm from './messageform/MessageForm';
import ComponentType from '../../ComponentType';
import styles from './Messages.module.scss';
import firebase from '../../firebase';



class Messages extends ComponentType {

    state = {
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.currentUser
    }

    componentDidMount() {
        console.log("FROM Messages, CHANNEL: ", this.state.channel );
        // console.log("FROM Messages, USER: ", this.state.user );
    }

    render() {
        const {messagesRef, channel, user} = this.state; 

        return (
            <>
            <MessagesHeader />
            
            <Segment>
                <Comment.Group className={styles.message}>
                    {/* Messages */}
                </Comment.Group>
            </Segment>

            <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
                currentUser={user}
            />
            </>
        )
    }
}
export default Messages;