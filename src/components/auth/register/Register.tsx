import React, { FormEventHandler } from "react";
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
import classes from "./Register.module.scss";
import firebase from "../../../firebase";
import md5 from "md5";

type FormEvent = React.FormEvent<HTMLFormElement>;
type InputEvent = React.FormEvent<HTMLInputElement>;

interface IErrorMessage {
  message: string;
}

interface IForm {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: Array<IErrorMessage>; // IErrorMessage is casted, not required when casted
  loading: boolean;
  usersRef: any;
  // value:string
}

export class Register extends ComponentType {
  // const Register = () => {
  state: IForm = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
    // value: ''
  };
  displayErrors = (errors: Array<IErrorMessage>) =>
    errors.map((error: IErrorMessage, i) => <p key={i}>{error.message}</p>);

  //Typescript uses event.currentTarget instead of event.target along with dot notation '.value'
  //InputEvent has been declared above with React.FormEvent<....>
  handleChange = (event: InputEvent) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };
  handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser: any) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
              });
            })
            .catch((err: Error) => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch((err: IErrorMessage) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  saveUser = (createdUser: any) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  handleInputError = (errors: Array<IErrorMessage>, inputName: string) =>
    errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";

  isFormValid = () => {
    let errors: Array<IErrorMessage> = this.state.errors;
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill In All Fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = (form: IForm) => {
    return (
      !form.username.length ||
      !form.email.length ||
      !form.password.length ||
      !form.passwordConfirmation.length
    );
  };

  isPasswordValid = (form: IForm) => {
    let { password, passwordConfirmation } = form;
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;
    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        className={classes.register}
        data-test="register-component"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <span className={classes.loginHeader}>Register With Us</span>
          </Header>
          <form
            data-test="form-component"
            onSubmit={this.handleSubmit}
            className={classes.formContainer}
          >
            <div>
              <p>DevChat</p>
            </div>

            <input
              data-test="username-input"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              type="text"
            />
            <input
              name="email"
              placeholder="Email Address"
              value={email}
              className={this.handleInputError(errors, "email")}
              onChange={this.handleChange}
              type="email"
            />

            <input
              name="password"
              placeholder="Password"
              value={password}
              className={this.handleInputError(errors, "password")}
              onChange={this.handleChange}
              type="password"
            />

            <input
              name="passwordConfirmation"
              placeholder="Password Confirmation"
              value={passwordConfirmation}
              className={this.handleInputError(errors, "password")}
              onChange={this.handleChange}
              type="password"
            />

            <Button
              data-test="component-submit-btn"
              disabled={loading}
              className={loading ? "loading" : " "}
              color="orange"
              size="large"
            >
              Submit
            </Button>
            <div className="uiMessage">
              Already a user?
              <Link to="/login"> Login</Link>
            </div>
          </form>
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
export default Register;
