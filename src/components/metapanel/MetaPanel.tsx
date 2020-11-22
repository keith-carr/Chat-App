import React from 'react';
import ComponentType from '../../ComponentType';
import { Segment, Header, Accordion, Icon, Image, List } from 'semantic-ui-react';
import classes from './MetaPanel.module.scss';

interface IProps {
    isPrivateChannel: boolean,
    currentChannel: any, 
    userPosts: any,
}

class MetaPanel extends ComponentType<IProps> {
    state = {
        activeIndex: 0,
        privateChannel: this.props.isPrivateChannel,
        currentChannel: this.props.currentChannel,
        userPosts: this.props.userPosts,
    }

    componentDidMount() {
        console.log('private Channel boolean in componentDidMount: ', this.state.privateChannel);
        console.log('current Channel object in componentDidMount: ', this.state.currentChannel);
    }

    formatCount = (num: any) => (num > 1 || num === 0 ? `${num} posts` : `${num} post`);

    displayTopPosters = (posts: any) =>
        Object.entries(posts)
              .sort((a:any, b:any) => b[1] - a[1])
              .map(([key, val]:any, i) => (
                <List.Item key={i}>
                    <Image avatar src={val.avatar} />
                    <List.Content>
                        <List.Header as ='a'>{key}</List.Header>
                        <List.Description>{this.formatCount(val.count)} posts</List.Description>
                    </List.Content>
                </List.Item>
              ))
              .slice(0, 5);

    setActiveIndex = (event: any, titleProps:{index:number}) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex })
    }

    render() {
        let {activeIndex, privateChannel, currentChannel} = this.state;
        const { userPosts } = this.props;

        if(privateChannel=== true) { 
            return null;
        }

        return (
            <Segment loading={!currentChannel} id={classes.metaPanel} >
                <Header as='h3' attached='top'>
                    About
                    <span> #{currentChannel && currentChannel.name}</span>
                </Header>
                <Accordion styled attached='true'>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.setActiveIndex}>
                            <Icon name='dropdown' color='black' />
                            <Icon name='info' color='black' />
                            Channel Details
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        {currentChannel && currentChannel.details}
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.setActiveIndex}>
                            <Icon name='dropdown' color='black' />
                            <Icon name='user circle' color='black' />
                            Top Posters
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <List>
                            {userPosts && this.displayTopPosters(userPosts)}
                            {console.log('users post: ', userPosts)} 
                        </List>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.setActiveIndex}>
                            <Icon name='dropdown' color='black' />
                            <Icon name='pencil alternate' color='black' />
                            Created By 
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Header as='h3'>
                            <Image circular src={currentChannel && currentChannel.createdBy.avatar} />
                            {currentChannel && currentChannel.createdBy.name}
                        </Header>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        )};
}

export default MetaPanel;