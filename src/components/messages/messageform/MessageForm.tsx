import React from 'react';
import uuidv4 from 'uuid/v4';
import firebase from '../../../firebase';
import {Segment, Button, Input} from 'semantic-ui-react';
import ComponentType from '../../../ComponentType';
import ProgressBar from '../progressbar/ProgressBar';
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
interface IState {
        storageRef:any,
        uploadTask: any,
        uploadState: string,
        percentUploaded: number,
        message: string,
        channel: {id: number},
        user: {
               uid: any,
               displayName: string,
               photoURL: string
            },
        loading: boolean,
        errors: [{message: string}],
        modal: boolean,
}


interface IProps {
    currentChannel: {id: number},
    currentUser: {  
                    uid: any,
                    displayName: string,
                    photoURL: string
                },
    messagesRef: any,
    isPrivateChannel: boolean,
    getMessagesRef: any,
}

class MessageForm extends ComponentType<IProps> {
    state:IState = {
        storageRef: firebase.storage().ref(),
        uploadTask: null,
        uploadState: '',
        percentUploaded: 0,
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
    createMessage = (fileUrl?:string):object => {
        let message: {
            timestamp:object,
            user: {
                id: number,
                name: string,
                avatar: string,
            },
            image: string,
            content: string,
        } 
            message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: this.state.user.uid,
                name: this.state.user.displayName,
                avatar: this.state.user.photoURL
            },
            image: '',
            content: ''
        };

        if(fileUrl !== null && fileUrl) {  //   ???? CHECKING FOR 'N U L L' ????
            message['image'] = fileUrl;
        } else {
            message['content'] = this.state.message;
        }

        return message;
    }
    /**
     * If there's a message then set the firebase messagesRef properties and state.loading to true
     * @function sendMessage
     * @param {undefined}
     * @returns {void}
     */
    sendMessage = (): void => {
        const { getMessagesRef } = this.props;
        const { message, channel } = this.state;

        if(message) {
            this.setState({loading: true});
            getMessagesRef()
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

    getPath = () => {
        if(this.props.isPrivateChannel) {
            return `chat/private-${this.state.channel.id}`;
        } else {
            return 'chat/public';
        }
    }

    uploadFile = (file:any, metadata:any) => {
        const pathToUpload = this.state.channel.id;
        const ref = this.props.messagesRef();
        //UUID creates random strings for pictures such as seen in social media imgs
        const filePath = `${this.getPath()}/${uuidv4()}.jpg`;
        
        this.setState({
            uploadState: 'uploading',
            uploadTask: this.state.storageRef.child(filePath).put(file, metadata)

        },  () => {
            this.state.uploadTask.on('state_changed', (snap:any) => {
                const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.setState({percentUploaded});
            },
                (err:Error) => {
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        uploadState: 'error',
                        uploadTask: null,
                    })
                },
                () => {
                    this.state.uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl:string) => {
                        this.sendFileMessage(downloadUrl, ref, pathToUpload);
                    })
                    .catch((err:Error)  => {
                        console.log(err);
                        this.setState({
                            errors: this.state.errors.concat(err),
                            uploadState: 'error',
                            uploadTask: null,
                        })
                    })
                }
            )
        });

    }//=>END OF uploadFile

    sendFileMessage = (fileUrl:string, ref:any, pathToUpload:number) => {
        ref.child(pathToUpload)   
           .push()
           .set(this.createMessage(fileUrl))
           .then(() => {
               this.setState({uploadState: 'done'})
           })
           .catch((err:Error) => {
            console.error(err);
            this.setState({
                errors: this.state.errors.concat(err)  
            })
           })
    }

    render() {
  
        const {errors, message, modal, loading, uploadState, percentUploaded} = this.state;

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
                    disabled={uploadState === 'uploading'}
                    onClick={this.openModal}
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                    />

            </Button.Group>        
                <FileModal
                    modal={modal}
                    closeModal={this.closeModal}
                    uploadFile={this.uploadFile}
                    />
                <ProgressBar
                    uploadState={uploadState} 
                    percentUploaded={percentUploaded}
                />
            </Segment>

        )
    }
}

export default MessageForm;