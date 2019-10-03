import React from 'react';
import moment from 'moment';
import { Comment, Image } from 'semantic-ui-react';

type messageType = {timestamp:number};

interface IState {
    key:number, 
    message:messageType,
    user: object
}

const isOwnMessage = (message:any, user:any) => 
    message.user.id === user.uid ? 'message__self' : '';

const isImage = (message:any) => 
    message.image !== '' && message.content === '';


const timeFromNow = (timestamp:number) => moment(timestamp).fromNow();

const Message = ({message, user}:any) => (
        <>
        <Comment>
            <Comment.Avatar src={message.user.avatar} />
            <Comment.Content className={isOwnMessage(message, user)}>
                <Comment.Author as='a'>{message.user.name}</Comment.Author>
                <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
               
                {isImage(message) ?
                     <Image src={message.image} className="message__image" />
                    : 
                     <Comment.Text>{message.content}</Comment.Text>    
            }
            </Comment.Content>
        </Comment>
        </>
    );
export default Message;
