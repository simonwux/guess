import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import People from "@material-ui/icons/People";
import PersonAdd from "@material-ui/icons/PersonAdd";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import loginPageStyle from "assets/jss/guess-react/views/loginPage.jsx";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.closeLoginMessage = this.closeLoginMessage.bind(this);
    this.closeRegisMessage = this.closeRegisMessage.bind(this);
    this.state = {
      cardAnimation: "cardHidden",
      name: "",
      email: "",
      password: "",
      password2: "",
      loginMsg: "",
      regisMsg: ""
    };
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleRegister() {
    const email = this.state.email;
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: this.state.password
      })
    })
      .then(response => {
        response
            .clone()
            .json()
            .then(data => {
              if (data.msg.toLowerCase().includes("success")) {
          response.json().then(() => this.props.login(email));
        } else {
          response
            .clone()
            .json()
            .then(data => this.setState({ regisMsg: data.msg }));
        }
      })})
      .catch(err => console.log(err));
  }

  handleLogin() {
    fetch("/users", {
      headers: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        response
            .clone()
            .json()
            .then(data => {
              if (data.msg.toLowerCase().includes("success")) {

          response.json().then(json => this.props.login(json.email));
        } else {
          // console.log(response);
          response
            .clone()
            .json()
            .then(data => this.setState({ loginMsg: data.msg }));
        }
      })})
      .catch(err => console.log(err));
  }

  tryLogin() {
    this.handleLogin();
    this.setState({ password: "" });
  }

  tryRegister() {
    this.handleRegister();
    this.setState({ password: "" });
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardAnimation: "" });
      }.bind(this),
      700
    );
  }

  closeLoginMessage() {
    this.setState({ loginMsg: "" });
  }

  closeRegisMessage() {
    this.setState({ regisMsg: "" });
  }

  render() {
    const { classes, ...rest } = this.props;
    const loginMsg = this.state.loginMsg;
    const regisMsg = this.state.regisMsg;
    const email = this.props.email;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Guess 2/3"
          rightLinks={<HeaderLinks email={email} />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            background: "linear-gradient(to right, #0062E6, #33AEFF)"
          }}
        >
          <div className={classes.section}>
            <div className={classes.container}>
              <div id="navigation-pills">
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <NavPills
                      color="primary"
                      tabs={[
                        {
                          tabButton: "Login",
                          tabIcon: Face,
                          tabContent: (
                            <Card className={classes[this.state.cardAnimation]}>
                              <form className={classes.form}>
                                <CardHeader
                                  color="primary"
                                  className={classes.cardHeader}
                                >
                                  <h4>Login</h4>
                                </CardHeader>
                                <CardBody>
                                  {loginMsg.length > 0 && (
                                    // <LoginError msg={this.state.msg} />
                                    <SnackbarContent
                                      message={loginMsg}
                                      close
                                      color="danger"
                                      icon="info_outline"
                                      closeMessage={this.closeLoginMessage}
                                    />
                                  )}
                                  <CustomInput
                                    labelText="Email..."
                                    id="email-login"
                                    placeholder=""
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail.bind(this)}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "email",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Email
                                            className={classes.inputIconsColor}
                                          />
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Password"
                                    id="pass-login"
                                    value={this.state.password}
                                    onChange={this.handleChangePassword.bind(
                                      this
                                    )}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "password",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Icon
                                            className={classes.inputIconsColor}
                                          >
                                            lock_outline
                                          </Icon>
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                  <Button
                                    simple
                                    color="primary"
                                    size="lg"
                                    onClick={this.tryLogin.bind(this)}
                                  >
                                    Get started
                                  </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          )
                        },
                        {
                          tabButton: "Register",
                          tabIcon: PersonAdd,
                          tabContent: (
                            <Card className={classes[this.state.cardAnimation]}>
                              <form className={classes.form}>
                                <CardHeader
                                  color="primary"
                                  className={classes.cardHeader}
                                >
                                  <h4>Register</h4>
                                </CardHeader>
                                <CardBody>
                                  {regisMsg.length > 0 && (
                                    // <LoginError msg={this.state.msg} />
                                    <SnackbarContent
                                      message={regisMsg}
                                      close
                                      color="danger"
                                      icon="info_outline"
                                      closeMessage={this.closeRegisMessage}
                                    />
                                  )}
                                  <CustomInput
                                    labelText="Email..."
                                    id="email-reg"
                                    placeholder=""
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail.bind(this)}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "email",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Email
                                            className={classes.inputIconsColor}
                                          />
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Password"
                                    id="pass-reg"
                                    value={this.state.password}
                                    onChange={this.handleChangePassword.bind(
                                      this
                                    )}
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "password",
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Icon
                                            className={classes.inputIconsColor}
                                          >
                                            lock_outline
                                          </Icon>
                                        </InputAdornment>
                                      )
                                    }}
                                  />
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                  <Button
                                    simple
                                    color="primary"
                                    size="lg"
                                    onClick={this.tryRegister.bind(this)}
                                  >
                                    Register
                                  </Button>
                                </CardFooter>
                              </form>
                            </Card>
                          )
                        }
                      ]}
                    />
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
  email: PropTypes.string
};

export default withStyles(loginPageStyle)(LoginPage);
