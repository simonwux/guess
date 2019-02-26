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
    this.state = {
      min: 0,
      max: 100,
      guess: "",
      success: false,
      error: false,
      msg: ""
    };
  }

  getWinners() {
    return;
  }

  tryGuess() {
    const guess = this.state.guess;
    fetch("/guess", {
      headers: {
        number: guess
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.getWinners();
        } else {
          console.log(response);
          response
            .clone()
            .json()
            .then(data => {
              console.log(data);
              if (data.msg.toLowerCase().includes("small")) {
                this.setState({ min: guess + 1, guess: undefined });
              } else {
                this.setState({ max: guess - 1, guess: undefined });
              }
            });
        }
      })
      .catch(err => console.log(err));
  }

  guessOnChange(e) {
    const re = /^\+?(0|[1-9]\d*)$/;
    var value = e.target.value;
    if (value !== "" && re.test(value)) {
      const blurVal = parseInt(value);
      if (blurVal > this.state.max) {
        this.setState({ success: false, error: true, msg: "Too Large" });
      } else if (blurVal < this.state.min) {
        this.setState({ success: false, error: true, msg: "Too Small" });
      } else {
        this.setState({ success: true, error: false, msg: "" });
      }
      this.setState({ guess: blurVal });
    } else {
      this.setState({ guess: "" });
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
          rightLinks={<HeaderLinks email={email} />}
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
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

GuessPage.propTypes = {
  email: PropTypes.string
};

export default withStyles(guessPageStyle)(GuessPage);
