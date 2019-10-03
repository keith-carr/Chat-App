import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from './messageform/MessageForm'; 
import MessagesHeader from './messagesheader/MessagesHeader';
import ComponentType from '../../ComponentType'; 
import Message from './message/Message';
import styles from './Messages.module.scss';
import firebase from '../../firebase'; 
import {InputEvent, FormEvent} from '../../ComponentType';


interface IProps {
    key: any,
    currentChannel: object,
    currentUser: object,
    isPrivateChannel: boolean,
}

class Messages extends ComponentType<IProps> {
    state:any = {
        privateChannel: this.props.isPrivateChannel,
        privateMessagesRef: firebase.database().ref('privateMessages'),
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        numUniqueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: [],
    }

    componentDidMount() {
       const { channel, user } = this.state;
    //    const channelId = this.state.channel.id;
    //    console.log('Messages.tsx -> State channel.id: ', this.state.channel.id);
       if(channel && user) {
        // console.log('(2) Messages.tsx -> State channel.id: ', this.state.channel.id);
            this.addListeners(channel.id);
       }
    }
     
    addListeners = (channelId:any) => {
        this.addMessageListener(channelId);
        return channelId;
    }
    /**
     * Pull data from messagesRef snap values in to loadedmessages
     * Set loadedMessages into state messages[] and set loading to false
     * @param {channelID:string} 
     * @return {void}
     */
    addMessageListener = (channelId:any) => {
        let loadedMessages:Array<any> = [];
        const ref = this.getMessagesRef();
        ref.messagesRef
        .child(channelId).on("child_added", (snap:any) => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            })
            this.countUniqueUsers(loadedMessages);
        })
    };

    getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, privateChannel } = this.state;
        return privateChannel ? privateMessagesRef : messagesRef;
    }

    /**
     * Function that's passed so that MessageHeader can 
     * have an effect in this upper Component Messages.
     * Changes the search term in Messages and searchLoading:true.
     */
    handleSearchChange = (event:InputEvent) => {
         this.setState({
             searchTerm: event.currentTarget.value,
             searchLoading: true,
         }, () => this.handleSearchMessages());
    }

    handleSearchMessages = () => {
        const channelMessages = [...this.state.messages];
        const regex = new RegExp(this.state.searchTerm, 'gi');
        const searchResults = channelMessages.reduce((acc, message) => {
            if(message.content && message.content.match(regex) ||
               message.user.name.match(regex)
            ) {
                acc.push(message);
            }
            return acc;
        }, []);
        this.setState({ searchResults });
        setTimeout(() => this.setState({ searchLoading: false}), 1000);
    }

    //check to see if accumulator includes a specific name from 'messages' to see if its unique
    countUniqueUsers = (messages:Array<any>) => {
        const uniqueUsers = messages.reduce((acc,message) => {
            if(!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        },[]);
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
        this.setState({numUniqueUsers});
    }

    displayMessages = (messages:Array<any>) => (
        messages.length > 0 && messages.map((message:{timestamp:number}) => (
            <Message
                key={message.timestamp}
                message={message}
                user={this.state.user}
            />
        ))
    )
    
    // isProgressBarVisible = (percent:number) => {
    //     if(percent > 0) {
    //         this.setState({progressBar: true});
    //     }
    // }
    
    displayChannelName = (channel:{id: number, name: string}) => 
    channel ? `${this.state.privateChannel ? '@' : '#'}${channel.name}` : '';
    
    render() {
        const {messagesRef, messages, channel, user, numUniqueUsers,
             searchTerm, searchResults, searchLoading, privateChannel} = this.state; 
 
        return (
            <>
            <MessagesHeader
                channelName={this.displayChannelName(channel)}
                numUniqueUsers={numUniqueUsers}
                handleSearchChange={this.handleSearchChange}
                searchLoading={searchLoading}
                isPrivateChannel={privateChannel}
            />
            
            <Segment> 
                <Comment.Group className={styles.messages}>
                    {searchTerm ? this.displayMessages(searchResults) :
                     this.displayMessages(messages)}
                </Comment.Group>
            </Segment>

            <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
                currentUser={user}
                isPrivateChannel={privateChannel}
                getMessageRef={this.getMessagesRef}
            />
            </>
        )
    }
}
export default Messages;
