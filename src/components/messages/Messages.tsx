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
        channel: this.props.currentChannel
    }
    render() {
        const {messagesRef, channel} = this.state; 

        return (
            <>
            <MessagesHeader />
            
            <Segment>
                <Comment.Group className={styles}>
                    {/* Messages */}
                </Comment.Group>
            </Segment>

            <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
            />
            </>
        )
    }
}
export default Messages;