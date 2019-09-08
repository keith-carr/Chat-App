import React from 'react';
import ComponentType from '../../ComponentType';
import { Menu } from 'semantic-ui-react';
import UserPanel from './userpanel/UserPanel';
import Channels from './channels/Channels';
import styles from "./SidePanel.module.scss";


class SidePanel extends ComponentType {
    state = {

    }
    componentDidMount() {
        console.log('USERNAME IN SIDEPANEL: ', this.props.currentUser);
    }
    render() {
        const { currentUser } = this.props;
        console.log('Current User In Side PANEL: ', this.props.currentUser);
        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{background: "#4c3c4c", fontSize: "1.2rem"}}
            >
                
                <UserPanel currentUser={currentUser} />
                <Channels currentUser={currentUser} />
            </Menu>
        )
    }
}
export default SidePanel;