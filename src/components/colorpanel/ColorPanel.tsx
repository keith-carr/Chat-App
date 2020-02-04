import React from 'react';
import { Label, Sidebar, Menu, Divider, Button, Modal, Icon, Segment } from 'semantic-ui-react';
import { SliderPicker } from 'react-color';
import firebase from 'firebase';
import ComponentType from '../../ComponentType';

interface IProps {
  currentUser: any,
}

class ColorPanel extends ComponentType<IProps> {
  state = {
    modal: false,
    primary: '',
    secondary: '',
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
  }

  handleChangePrimary = (color: any) => this.setState({primary: color.hex});
  handleChangeSecondary = (color: any) => this.setState({secondary: color.hex});

  handleSaveColors = () => {
    if(this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary); 
    }
  }
  
  saveColors = (primary:string, secondary:string) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(() => {
        console.log('Colors added');
        // this.closeModal();
      })
      .catch( (err) => console.log(err));
  } 

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

    render() {
        let {modal, primary, secondary} = this.state;

        return (
            <Sidebar
              as={Menu}
              // icon='label'
              inverted
              vertical
              visible
              width='very thin'
            >
              <Divider />
            
              <Button icon='add' size='small' style={{backgroundColor: '#00ada5'}} onClick={this.openModal} />
              <Modal basic open={this.state.modal} onClose={this.closeModal}>
                <Modal.Header>
                  <Modal.Content>
                    
                      <Segment inverted onClick={this.handleSaveColors}>
                        <Label content= 'Primary Color' />
                        <SliderPicker color={primary} onChange={this.handleChangePrimary} />
                      </Segment>
                      <Segment inverted onClick={this.handleSaveColors}>
                        <Label content='Secondary Color' />
                        <SliderPicker color={secondary} onChange={this.handleChangeSecondary} />
                      </Segment>

                  </Modal.Content>
                  
                  <Modal.Actions>
                    <Button color='green' inverted>
                       <Icon name='checkmark' /> Apply Colors
                    </Button>
                    <Button color='red' onClick={this.closeModal} inverted>
                       <Icon name='remove'  /> Cancel
                    </Button>
                  </Modal.Actions>
                </Modal.Header>
              </Modal>
            </Sidebar>
        )
    }
}
export default ColorPanel;