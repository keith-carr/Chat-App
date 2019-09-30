import React from 'react';
import {Header, Segment, Input, Icon} from 'semantic-ui-react';
import ComponentType from '../../../ComponentType';

interface IProps {
    channelName: string,
    numUniqueUsers: number,
}

class MessagesHeader extends ComponentType<IProps> {

    render() {
        const {channelName, numUniqueUsers} = this.props;
        return (
            <Segment clearing>
                {/* Channel Title */}
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>
                       {channelName}
                       <Icon name={'star outline'} color='black' />
                    </span>
                    
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>

                {/* Channel Search Input */}
                <Header>
                <Input
                    size="mini"
                    icon="search"
                    name="searchTerm"
                    placeholder="Search Messages"
                />

                </Header>
            </Segment>
        );
    }
}

export default MessagesHeader;