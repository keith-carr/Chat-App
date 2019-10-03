import React from 'react';
import {Header, Segment, Input, Icon} from 'semantic-ui-react';
import ComponentType, {InputEvent, FormEvent} from '../../../ComponentType';


interface IProps {
    channelName: string,
    numUniqueUsers: number,
    handleSearchChange:(event:any) => void,
    searchLoading: boolean,
    isPrivateChannel: boolean,
}

class MessagesHeader extends ComponentType<IProps> {

    render() {
        const {channelName, numUniqueUsers, handleSearchChange, 
            searchLoading, isPrivateChannel} = this.props;
        return (
            <Segment clearing>
                {/* Channel Title */}
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>
                       {channelName}
                       {!isPrivateChannel && <Icon name={'star outline'} color='black' />}
                    </span>
                    
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>

                {/* Channel Search Input */}
                <Header>
                <Input
                    loading={searchLoading}
                    onChange={handleSearchChange}
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