import React from 'react';
import { Modal, Input, Icon, Button } from 'semantic-ui-react'; 
import ComponentType from '../../../../ComponentType';
interface IProps {
    modal:boolean,
    closeModal:()=>void
}

class FileModal extends ComponentType {
    state = {
        file: '',
    }
    render() {
        const {modal, closeModal} = this.props;
        return ( 
                    <Modal basic open={modal} onClose={closeModal}>
                        <Modal.Header>Select an Image Files</Modal.Header>
                        <Modal.Content>
                            <Input
                                fluid
                                label='File types: jpg, png'
                                name='file'
                                type='file'
                            />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                color='green'
                                inverted
                            >
                                <Icon name='checkmark' /> Send
                            </Button>
                            <Button
                                color='red'
                                inverted
                                onClick={closeModal}
                            > 
                                <Icon name='remove' /> Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>
                );
            }
}
export default FileModal;