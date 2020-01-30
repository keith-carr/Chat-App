import React from 'react';
import ComponentType from '../../ComponentType';
import { Segment, Header, Accordion } from 'semantic-ui-react';

class MetaPanel extends ComponentType {
    state = {
        activeIndex: 0
    }

    setActive = (event: any, titleProps: string) => {

    }
    render() {
        let {activeIndex} = this.state;
        return (
            <Segment>
                <Header as='h3' attached='top'>
                    About # Channel
                </Header>
                <Accordion style attached='true'>
                    <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    // onClick={this.setActiveIndex}
                    ></Accordion.Title>
                </Accordion>
            </Segment>
        )
    }
}
export default MetaPanel;