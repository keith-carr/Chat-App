import React from 'react';
import ComponentType from '../../ComponentType';
import { Menu } from 'semantic-ui-react';
import UserPanel from './userpanel/UserPanel';

class SidePanel extends ComponentType {
    state = {

    }
    render() {
        return (
            <Menu
            size="large"
            inverted
            fixed="left"
            vertical
            style={{background: "#4c3c4c", fontSize: "1.2rem"}}
            >
            <UserPanel />
            </Menu>
        )
    }
}
export default SidePanel;