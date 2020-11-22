import React from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessageForm from './messageform/MessageForm'; 
import MessagesHeader from './messagesheader/MessagesHeader';
import ComponentType from '../../ComponentType'; 
import Message from './message/Message';
import styles from './Messages.module.scss';
import firebase from '../../firebase'; 
import {InputEvent} from '../../ComponentType';
import { connect } from 'react-redux';
import { setUserPosts } from '../../store/actions/index';
import classes from './Messages.module.scss';

interface IProps {
    key: any,
    currentChannel: object,
    currentUser: object,
    isPrivateChannel: boolean,
    handleStar?: () => void,
    starChannel?: () => void,
    addUserStarsListener?: () => void,
    setUserPosts?: any,
}

interface IState {
    privateChannel: boolean,
    privateMessagesRef: any,
    messagesRef: any,
    messages: [],
    messagesLoading: boolean,
    channel: object,
    user: object,
    userRef: object,
    numUniqueUsers: string,
    searchTerm: string,
    searchLoading: boolean,
    searchResults: [],
    isChannelStarred: boolean
}

class Messages extends ComponentType<IProps> {
    state:any = {
        privateChannel: this.props.isPrivateChannel,
        privateMessagesRef: firebase.database().ref("privateMessages"),
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users'),
        numUniqueUsers: '',
        searchTerm: '',
        searchLoading: false,
        searchResults: [],
        isChannelStarred: false,
    }

    componentDidMount() {

       const { channel, user } = this.state;

       if(channel && user) {
            this.addListeners(channel.id);
            this.addUserStarsListener(channel.id, user.uid);
       }
    }

    addUserStarsListener = (channelId: string, userId: number) => {
        this.state.usersRef
            .child(userId)
            .child('starred')
            .once('value')
            .then((data: {val:()=>any}) => {
                 if(data.val() !== null) {
                    const channelIds = Object.keys(data.val());
                    const prevStarred = channelIds.includes(channelId);
                    this.setState({ isChannelStarred: prevStarred});
                 }
            }) 
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
    addMessageListener = (channelId: any):void => {
        let loadedMessages:Array<any> = [];
        const ref = this.getMessagesRef();
        ref.child(channelId).on("child_added", (snap:any) => {
          loadedMessages.push(snap.val());
          this.setState({
            messages: loadedMessages,
            messagesLoading: false
          });
          this.countUniqueUsers(loadedMessages);
          this.countUserPosts(loadedMessages);
        });
      };

    getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, privateChannel } = this.state;
        return privateChannel ? privateMessagesRef : messagesRef;
      };

    handleStar = () => {
        this.setState((prevState:{isChannelStarred: boolean}) => ({
            isChannelStarred: !prevState.isChannelStarred
        }), () => this.starChannel());
    }

    starChannel = () => {
        if(this.state.isChannelStarred) {
            this.state.usersRef
                .child(`${this.state.user.uid}/starred`) //UsersRef object has a child which is like a property, then state.user 
                                                         //represents specific user and reacheds in the /starred directory
                .update({
                    [this.state.channel.id]: {
                        name: this.state.channel.name,
                        details: this.state.channel.details,
                        createBy: {
                            name: this.state.channel.createdBy.name,
                            avatar: this.state.channel.createdBy.avatar,
                        }
                    }
                });
            
        } else {
            this.state.usersRef
                .child(`${this.state.user.uid}/starred`)
                .child(this.state.channel.id)
                .remove((err:Error) => {
                    if(err !== null) {
                        console.error(err);
                    }
                })
        }
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

    // countUsersPosts = (messages:Array<string>) => {
    //     let userPosts = messages.reduce((acc:any, message:any):any => {
    //         if(message.user.name in acc) {
    //             acc[message.user.name].count += 1;
    //         } else {
    //             acc[message.user.name] = {
    //                 avatar: message.user.avatar,
    //                 count: 1
    //             }
    //         }
    //         return acc;
    //     }, {});
       
    // }

    countUserPosts = (messages: Array<any>) => {
        let userPosts = messages.reduce((acc, message) => {
            if(message.user.name in acc) {
                acc[message.user.name].count += 1;
            } else {
                acc[message.user.name] = {
                    avatar: message.user.avatar,
                    count: 1
                }
            }
            return acc;
        }, {});
        console.log('userPosts -> Messages: ', userPosts);
        this.props.setUserPosts(userPosts);
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
             searchTerm, searchResults, searchLoading, privateChannel, isChannelStarred} = this.state; 
 
        return (
            <>
            <MessagesHeader
                channelName={this.displayChannelName(channel)}
                numUniqueUsers={numUniqueUsers}
                handleSearchChange={this.handleSearchChange}
                searchLoading={searchLoading}
                isPrivateChannel={privateChannel}
                handleStar={this.handleStar}
                isChannelStarred={isChannelStarred}
            />
            
            {/* <div className={classes.messages__segmentWrapper}> */}
            <Segment> 
                <Comment.Group style={{maxWidth:'98%'}} className={styles.messages}>
                    {searchTerm ? this.displayMessages(searchResults) :
                     this.displayMessages(messages)}
                </Comment.Group>
            </Segment>
            {/* </div> */}
            <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
                currentUser={user}
                isPrivateChannel={privateChannel}
                getMessagesRef={this.getMessagesRef}
            />
            </>
        )
    }
}
export default connect<any, any>(null, {setUserPosts})(Messages);
