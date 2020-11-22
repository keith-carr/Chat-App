import React from 'react';
import ComponentType from '../../ComponentType';
import { Menu } from 'semantic-ui-react';
import UserPanel from './userpanel/UserPanel';
import Channels from './channels/Channels';
import DirectMessages from './directmessages/DirectMessages';
import Starred from './starred/Starred';
import classes from './SidePanel.module.scss';

class SidePanel extends ComponentType {
    render() {
        const { currentUser, primaryColor } = this.props;

        return (
            <Menu
                id={classes.slidePanelContainer}
                size="large"
                inverted
                fixed="left"
                vertical
                style={{background: primaryColor, fontSize: '1.2rem'}}
            >   
                <UserPanel primaryColor={primaryColor} currentUser={currentUser} />
                <Starred currentUser={currentUser} />
                <Channels currentUser={currentUser} />
                <DirectMessages currentUser={currentUser} />
            </Menu>
        )
    }
}
export default SidePanel;