import React, { Component } from "react";
import "../firebase";
import firebase from "firebase";
import firebaseui from "firebaseui";
import {
  Grid,
  Card,
  Segment,
  Button,
  Header,
  Icon,
  Transition,
  Container,
  Divider
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
const authUi = new firebaseui.auth.AuthUI(firebase.auth());

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    const uiConfig = {
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        recaptchaParameters: {
            type: 'image', // 'audio'
            size: 'compact', // 'invisible' or 'compact'
            badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
        },
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: () => {
            window.firebase = firebase.auth()
          window.location.reload();
        }
      }
    };
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        signedIn: !!user,
        user: user ? user.toJSON() : {displayName: `anonymous`}
      });
    });

    authUi.start("#fireauth", uiConfig);
  }

  componentDidUpdate() {
    //     firebase
    //         .auth()
    //         .onAuthStateChanged(user => {
    //             user.emailVerified ?
    //             this.setState({signedIn: !!user, user: user.toJSON()})
    //                 : null
    //         });
  }

  render() {
    let {
      displayName,
      email,
      emailVerified,
      photoUrl,
      isAnonymous,
      lastLoginAt,
      uid,
      providerData
    } = this.state.user ? this.state.user : {};
    console.log(this.state);
    let date = Date(lastLoginAt);
    return !this.state.signedIn ? (
      <Transition animation={`jiggle`} transitionOnMount>
        <Container fluid className={`signup`}>
          <Card raised centered color={"red"}>
            <Card.Header size={`small`}>
              <Icon
                name={"user"}
                size={`large`}
                fitted
                corner
                circular
                color={`red`}
              />
              Login
            </Card.Header>
            <Card.Content>
              <Transition animation={`fade`}>
                <div id={`fireauth`} />
              </Transition>
            </Card.Content>
          </Card>
        </Container>
      </Transition>
    ) : (
      <Container>
        <Card className={`signup`} raised color={"blue"}>
          <Card.Header size={`large`}>
            <Icon
              name={"user"}
              size={`large`}
              fitted
              corner
              circular
              color={`green`}
            />
            Welcome, {displayName} !
          </Card.Header>
          <Card.Description size={`small`}>
            <Grid.Row>Email: {email}</Grid.Row>
            <Grid.Row>{uid}</Grid.Row>
            <Grid.Row>Last Login: {date}</Grid.Row>
            <Grid.Row>Name: {displayName}</Grid.Row>
          </Card.Description>
          <Card.Content textAlign={`right`}>
            {!emailVerified ? (
              <div>
                <Icon
                  name={`alarm`}
                  color={`red`}
                  size={`small`}
                  fitted
                  corner
                  circular
                />
                Please verify email address!
              </div>
            ) : (
              `Welcome, ${displayName} !`
            )}
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default App;
// {!firebase.auth().currentUser.email ? firebase.auth().signInAnonymously()}
// {firebase.auth().currentUser.photoURL}
// {firebase.auth().currentUser.getToken().getValue.toString()}
