import React from 'react';
import ComponentType from '../../ComponentType';
import { Menu } from 'semantic-ui-react';
import UserPanel from './userpanel/UserPanel';
import Channels from './channels/Channels';
import DirectMessages from './directmessages/DirectMessages';
import Starred from './starred/Starred';


class SidePanel extends ComponentType {
    render() {
        const { currentUser } = this.props;

        return (
            <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{background: "#4c3c4c", fontSize: "1.2rem"}}
            >   
                <UserPanel currentUser={currentUser} />
                <Starred currentUser={currentUser} />
                <Channels currentUser={currentUser} />
                <DirectMessages currentUser={currentUser} />
            </Menu>
        )
    }
}
export default SidePanel;