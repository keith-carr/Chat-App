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
    userColors: []
  }

  componentDidMount() {
    if(this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  addListener = (userId: number) => {
    let userColors: Array<string> = [];
    this.state.usersRef
      .child(`${userId}/colors`)
      .on('child_added', snap => {
        userColors.unshift(snap.val());
        this.setState({userColors});
      });
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
        this.closeModal(); 
      })
      .catch( (err) => console.error(err));
  } 

  displayUserColors = (colors: any) => (
    colors.length > 0 && colors.map((color:any, i: number) => (
      <React.Fragment key={i}>
        <Divider />
        <div className="color__container">
          <div className="color__square" style={{background: color.primary}}>
            <div className="color__overlay" style={{background: color.secondary}}></div>
          </div>
        </div>
      </React.Fragment>
    ))
  )

  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

    render() {
        let {modal, primary, secondary, userColors} = this.state;

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
              {this.displayUserColors(userColors)}
              <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>
                  <Modal.Content>
                    
                      <Segment inverted  >
                        <Label content= 'Primary Color' />
                        <SliderPicker color={primary} onChange={this.handleChangePrimary} />
                      </Segment>
                      <Segment inverted  >
                        <Label content='Secondary Color' />
                        <SliderPicker color={secondary} onChange={this.handleChangeSecondary} />
                      </Segment>

                  </Modal.Content>
                  
                  <Modal.Actions>
                    <Button color='green' inverted  onClick={this.handleSaveColors}>
                       <Icon name='checkmark' /> Save Colors
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