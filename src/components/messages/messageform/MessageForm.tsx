import React from 'react';
import firebase from '../../../firebase';
import {Segment, Button, Input} from 'semantic-ui-react';
import ComponentType from '../../../ComponentType';
import styles from './MessageForm.module.scss';
import { any } from 'prop-types';

/**
 * FormEvent for Submiting the form
 * InputEven for Event.target properties such as currentTarget.value & name
 */
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.FormEvent<HTMLInputElement>;


class MessageForm extends ComponentType {
    state = {
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [] 
    }

    handleChange = (event:InputEvent) => {
        this.setState({[event.currentTarget.name]: event.currentTarget.value});
    }
    /**
     * Creates a message object with timestamp, user, & content properties
     * @function createMessage
     * @returns {message}
     */
    createMessage = () => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.display,
                avatar: this.state.user.photoURL
            },
            content: this.state.message
        }
        return message;
    }
    /**
     * If there's a message then set the firebase messageRef properties and state.loading to true
     * @function sendMessage
     * @param {undefined}
     * @returns {void}
     */
    sendMessage = (): void => {
        const { messagesRef } = this.props;
        const { message, channel } = this.state;

        if(message) {
            this.setState({loading: true})
            messagesRef
                .child(channel.id)
                .push() //Push on to messageRef
                .set(this.createMessage())
                .then(() => {
                    this.setState({loading:false, message: '', errors:[] })
                })
                .catch( (err:[]) => {
                    console.error(err);
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    })
                })
        }
    }


    render() {
        return (

            <Segment
             className={styles.messageForm}
            >
                <Input 
                    fluid
                    name='message'
                    style={{marginBottom: '0.7em'}}
                    label={<Button icon={'add'} />}
                    labelPosition='left'
                    placeholder='Write your message'
                    />

            <Button.Group icon widths='1'>
                <Button
                    onClick={this.sendMessage}
                    color='orange'
                    content='Add Replay'
                    labelPosition='left'
                    icon='edit'
                />
                <Button
                    color='teal'
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                    />
            </Button.Group>
            </Segment>

        )
    }
}

export default MessageForm;