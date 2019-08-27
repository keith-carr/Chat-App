import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';

import MessagesHeader from './messagesheader/MessagesHeader';
import MessageForm from './messageform/MessageForm';
import ComponentType from '../../ComponentType';
import styles from './Messages.module.scss';

class Messages extends ComponentType {
    state = {

    }
    render() {
        return (
            <>
            <MessagesHeader />
            
            <Segment>
                <Comment.Group className={styles}>
                    {/* Messages */}
                </Comment.Group>
            </Segment>

            <MessageForm />
            </>
        )
    }
}
export default Messages;