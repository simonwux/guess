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

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";
import ListIcon from "@material-ui/icons/List";
import ErrorIcon from "@material-ui/icons/Error";

import boardStyle from "assets/jss/guess-react/board.jsx";

// Sections for this page
// import InputSection from "./Sections/InputSection.jsx";

const dashboardRoutes = [];

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winners: []
    };
    this.getWinners();
  }

  getWinners() {
    fetch("/winner")
      .then(response => {
        if (response.status === 200) {
          response
            .clone()
            .json()
            .then(data => {
              this.setState({ winners: data });
              console.log(data);
            });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes, ...rest } = this.props;
    const email = this.props.email;
    const winners = this.state.winners.map((w, i) => (
      <ListItem key={i}>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={w.email} secondary={"Count: " + w.count} />
        <ListItemSecondaryAction>{pad(i + 1, 2)}</ListItemSecondaryAction>
      </ListItem>
    ));
    console.log(winners);

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
          <div className={classes.containerP}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Check all other winners</h1>
                  <h3 className={classes.subtitleP}>
                    How many guesses did you use to get the right answer? Here
                    are the top 10s! Are you one of them?
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer className={classes.textCenter} justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <h2>Winners</h2>
                <List>
                  {this.state.winners.length > 0 && (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ListIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Users" />
                      <ListItemSecondaryAction>Rank</ListItemSecondaryAction>
                    </ListItem>
                  )}
                  {this.state.winners.length > 0 && winners}
                  {this.state.winners.length === 0 && (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ErrorIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="No winner yet" />
                    </ListItem>
                  )}
                </List>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

BoardPage.propTypes = {
  email: PropTypes.string,
  logout: PropTypes.func
};

export default withStyles(boardStyle)(BoardPage);
