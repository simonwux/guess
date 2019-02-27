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
// import InputSection from "./Sections/InputSection.jsx";

const dashboardRoutes = [];

class GuessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winners: []
    };
  }

  getWinners() {
    fetch("/guess", {})
      .then(response => {
        if (response.status === 200) {
          response
            .clone()
            .json()
            .then(data => {
              this.setState({ winners: data });
            });
        }
      })
      .catch(err => console.log(err));
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
                <h1 className={classes.title}>Check all other winners</h1>
                <h4>
                  How many guesses did you use to get the right answer? Here are
                  the top 10s! Are you one of them?
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            aaa
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
