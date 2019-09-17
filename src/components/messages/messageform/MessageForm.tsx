import React from 'react';
import firebase from '../../../firebase';
import {Segment, Button, Input} from 'semantic-ui-react';
import ComponentType from '../../../ComponentType';
import styles from './MessageForm.module.scss';
import FileModal from './filemodal/FileModal';

/**
 * FormEvent for Submiting the form
 * InputEven for Event.target properties such as currentTarget.value & name
 */
type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.FormEvent<HTMLInputElement>;

// interface IState {
//     message:string,
//     channel:object,
//     user:object,
//     loading:boolean,
//     errors:[ConcatArray<ErrorConstructor>, {message:}]
// }

class MessageForm extends ComponentType {
    state = {
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [{message: ''}],
        modal: false,
    }

    openModal = () => this.setState({modal: true});

    closeModal = () => this.setState({modal: false});

    handleChange = (event:InputEvent) => {
        this.setState({[event.currentTarget.name]: event.currentTarget.value});
    }
    /**
     * Creates a message object with timestamp, user, & content properties
     * @function createMessage
     * @returns {message:object}
     */
    createMessage = ():object => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
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
            this.setState({loading: true});
            console.log('SendMessage() -> Message Ref: ', messagesRef);
            messagesRef
                .child(channel.id)
                .push()
                .set(this.createMessage())
                .then(() => {
                    this.setState({loading:false, message: '', errors:[] })
                })
                .catch( (err:ConcatArray<{message:string}>) => {
                    console.error(err);
                    this.setState({
                        loading: false,
                        errors: this.state.errors.concat(err)
                    })
                })
        }        
        else {
            this.setState({
                errors: this.state.errors.concat({ message: 'Add a message' })
            })
        }
    }


    render() {

        const {errors, message, modal, loading} = this.state;

        return (

            <Segment
             className={styles.messageForm}
            >
                <Input 
                    fluid
                    name='message'
                    onChange={this.handleChange}
                    value={message}
                    style={{marginBottom: '0.7em'}}
                    label={<Button icon={'add'} />}
                    labelPosition='left'
                    placeholder='Write your message'
                    className={
                        errors.some(error => error.message.includes('message')) 
                        ? 'error' 
                        : ''
                    }
                    />

            <Button.Group icon widths='1'>
                <Button
                    onClick={this.sendMessage}
                    disabled={loading}
                    color='orange'
                    content='Add Replay'
                    labelPosition='left'
                    icon='edit'
                />
                <Button
                    color='teal'
                    onClick={this.openModal}
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                    />
                <FileModal
                    modal={modal}
                    closeModal={this.closeModal}
                />
            </Button.Group>
            </Segment>

        )
    }
}

export default MessageForm;