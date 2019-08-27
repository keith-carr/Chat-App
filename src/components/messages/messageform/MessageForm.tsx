import React from 'react';
import {Segment, Button, Input} from 'semantic-ui-react';
import ComponentType from '../../../ComponentType';
import styles from './MessageForm.module.scss';

class MessageForm extends ComponentType {

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