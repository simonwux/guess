import React from "react";
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import guessPageStyle from "assets/jss/guess-react/views/guessPage.jsx";

// Sections for this page
import InputSection from "./Sections/InputSection.jsx";

const dashboardRoutes = [];

class GuessPage extends React.Component {
  constructor(props) {
    super(props);
    this.guessOnChange = this.guessOnChange.bind(this);
    this.guessOnKeyPress = this.guessOnKeyPress.bind(this);
    this.tryGuess = this.tryGuess.bind(this);
    this.won = this.won.bind(this);
    this.state = {
      guess: "",
      history: [],
      success: false,
      error: false,
      msg: "",
      won: false,
      lastGuess: "",
      lastResult: ""
    };
  }

  won() {
    this.setState({ won: true, lastResult: "" });
  }

  guessWrong() {
    return;
  }

  tryGuess() {
    const guess = this.state.guess;
    const history = this.state.history;
    fetch("/guess", {
      headers: {
        email: this.props.email,
        number: guess
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.won();
        } else {
          response
            .clone()
            .json()
            .then(data => {
              if (data.msg.toLowerCase().includes("small")) {
                history.push({ guess: guess, result: "Too Small" });
                this.setState({ lastResult: "Too Small" });
              } else {
                history.push({ guess: guess, result: "Too Big" });
                this.setState({ lastResult: "Too Big" });
              }
              this.setState({
                history: history,
                guess: "",
                success: false,
                error: false,
                lastGuess: guess
              });
              this.guessWrong();
            });
        }
      })
      .catch(err => console.log(err));
/*    fetch("/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email
      })
    }).catch(err => console.log(err));*/
  }

  guessOnChange(e) {
    const re = /^\+?(0|[1-9]\d*)$/;
    var value = e.target.value;
    if (value !== "" && re.test(value)) {
      const blurVal = parseInt(value);
      if (blurVal > 100 || blurVal < 0) {
        this.setState({
          success: false,
          error: true,
          msg: "Not an integer between 0 and 100"
        });
      } else {
        this.setState({ success: true, error: false, msg: "" });
      }
      this.setState({ guess: blurVal });
    } else {
      this.setState({ guess: "", success: false, error: false, msg: "" });
    }
  }

  guessOnKeyPress(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const email = this.props.email;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Guess 2/3"
          rightLinks={<HeaderLinks email={email} logout={this.props.logout} />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax
          filter
          background="linear-gradient(to right, #0062E6, #33AEFF)"
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>What is the rule of the game?</h1>
                <h4>
                  You need to guess what 2/3 of the average of everybody guesses
                  are, and where the numbers are restricted to the integers
                  between 0 and 100, inclusive. The winner is the one closest to
                  the 2/3 average..
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <InputSection
              guessOnChange={this.guessOnChange}
              guessOnKeyPress={this.guessOnKeyPress}
              guessValue={this.state.guess}
              guessSuccess={this.state.success}
              guessError={this.state.error}
              guessMessage={this.state.msg}
              guessSubmit={this.tryGuess}
              guessHistory={this.state.history}
              won={this.state.won}
              lastGuess={this.state.lastGuess}
              lastResult={this.state.lastResult}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

GuessPage.propTypes = {
  email: PropTypes.string,
  logout: PropTypes.func
};

export default withStyles(guessPageStyle)(GuessPage);
