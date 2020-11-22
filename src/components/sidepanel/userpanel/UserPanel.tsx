import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../../firebase";
// import styles from "./UserPanel.module.scss";
import "./UserPanel.scss";
import { IColors } from "../../colorpanel/ColorPanel";

export interface Store extends React.Props<any> {
  store?: any;
}

interface Props {
  currentUser: {
    displayName: string;
    photoURL: string;
  },
  primaryColor: IColors
}

class UserPanel extends React.Component<Props> {
  state = {
    user: this.props.currentUser
  };
  componentDidMount() {
    this.setState({ user: this.props.currentUser });

  }

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          {" "}
          Signed in as<strong>{this.props.currentUser.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };
  render() {
    console.log(this.props.currentUser);
    const { user } = this.state;
    const { primaryColor } = this.props;
    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Column>
            <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
              {/* App Header */}
              <Header inverted floated="left" as="h2">
                <Icon name="code" />
                <Header.Content>DevChat</Header.Content>
              </Header>
              
              {/* User Dropdown */}
              <Header style={{ padding: "0.25em" }} as="h4" inverted />
              <Dropdown
                trigger={
                  <span style={{ color: "white" }}>
                  <br />
                    <Image space="right" avatar src={user.photoURL}   />
                    {this.state.user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any): any => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);

// === LEFT OFF 3:34 ======
