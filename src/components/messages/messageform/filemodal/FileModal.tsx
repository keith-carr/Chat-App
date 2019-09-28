import React from 'react';
import uuidv4 from 'uuid/v4';
import { Modal, Input, Icon, Button } from 'semantic-ui-react'; 
import ComponentType from '../../../../ComponentType';
import {InputEvent} from '../../../../ComponentType';
import mime from 'mime-types';


class FileModal extends ComponentType {
    state:any = {
        file: null,
        authorized: ['image/jpeg', 'image/png'],
    }

    addFile = (event:InputEvent) => {
        // event.currentTarget.files[0] was giving a 'possibly null error' where the 
        // type was identified as 'FILE | null'.So below(line22 setState({file: files[0]})), where 
        // checked if file is null I set state.file to be the index 0, file[0]
        const files = event.currentTarget.files;
        
        if(files != null) {
            this.setState({file: files[0]});
            console.log("FileModal -> State FILES: ", files);
        }

    };
    sendFile = () => {
        const {file} = this.state;
        const {uploadFile, closeModal} = this.props;

        if(file !== null) {
            if(this.isAuthorized(file.name)) {
                // send file
                const metadata = { contentType: mime.lookup(file.name) };
                uploadFile(file, metadata);
                closeModal();
                this.clearFile();
            }
        }
    }

    // lookup = () => {
        
    //    let result = mime.lookup(filename); 
    //    results === true ? 'true' : '';
    // }
    //                                        includes takes in any returns boolean
    //                                         mime  takes in string returns false
    
    // Check to see if file is an authorized type to be uploaded, using state.authorized
    isAuthorized = (filename:any) => this.state.authorized.includes(mime.lookup(filename));
    
    clearFile = () => this.setState({file: null});

    render() {
        const {modal, closeModal} = this.props;
        return ( 
                    <Modal basic open={modal} onClose={closeModal}>
                        <Modal.Header>Select an Image Files</Modal.Header>
                        <Modal.Content>
                            <Input
                                onChange={this.addFile}
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
                                onClick={this.sendFile}
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