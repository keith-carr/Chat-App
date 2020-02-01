import React from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import ComponentType from "../../../ComponentType";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import firebase from 'firebase';

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.FormEvent<HTMLInputElement>;

interface IErrorMessage {
  message: string;
}

interface IForm {
  email: string;
  password: string;
  errors: Array<IErrorMessage>; // IErrorMessage is casted, not required when casted
  loading: boolean;
}

class Login extends ComponentType {
  // const Register = () => {
  state: IForm = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };
  displayErrors = (errors: Array<IErrorMessage>) =>
    errors.map((error: IErrorMessage, i) => <p key={i}>{error.message}</p>);

  //Typescript uses event.currentTarget instead of event.target along with dot notation '.value'
  //InputEvent has been declared above with React.FormEvent<....>
  handleChange = (event: InputEvent) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };
  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
    firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
            console.log(signedInUser);
        })
        .catch(err => {
            console.error(err);
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            })
        })
    }
  };

  isFormValid = (credentials:{email:string, password:string}) => credentials.email && credentials.password;

  handleInputError = (errors: Array<IErrorMessage>, inputName: string) =>
    errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";

  render() {
    const { email, password, errors, loading } = this.state;
    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className={styles.register}
        data-test="register-component"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login For DevChat
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                value={email}
                className={this.handleInputError(errors, "email")}
                onChange={this.handleChange}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="repeat"
                iconPosition="left"
                placeholder="Password"
                value={password}
                className={this.handleInputError(errors, "password")}
                onChange={this.handleChange}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : " "}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>

            <Message>
              Don't have an account?
              <Link to="/register">Register</Link>
            </Message>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
export default Login;
