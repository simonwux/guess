import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

// @material-ui/core
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Badge from "components/Badge/Badge.jsx";

import inputStyle from "assets/jss/guess-react/views/guessPageSections/inputStyle.jsx";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class InputSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      openLeft: false,
      openTop: false,
      openBottom: false,
      openRight: false
    };
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }

  render() {
    const {
      classes,
      guessOnChange,
      guessOnKeyPress,
      guessValue,
      guessSuccess,
      guessError,
      guessMessage,
      guessSubmit,
      guessHistory,
      won,
      lastGuess,
      lastResult
    } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2
              className={classes.title + (won ? " " + classes.successText : "")}
            >
              {won ? "Succeeded!" : "Start your guess below"}
            </h2>
            {won && (
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.text}>
                  {" "}
                  {"You won! The 2/3 of the current average is " +
                    guessValue}{" "}
                </h4>
                <Link to="/board" className={classes.link}>
                  <Button color="primary" size="lg">
                    Open Winner Board
                  </Button>
                </Link>
              </GridItem>
            )}
            {!won && lastGuess !== "" && (
              <GridItem xs={12} sm={12} md={12}>
                <h4 className={classes.text}>
                  {" "}
                  {"You guessed " + lastGuess}
                  {" but it was " + lastResult}
                </h4>
              </GridItem>
            )}
            {!won && (
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={
                        guessMessage.length === 0 ? "Your Guess" : guessMessage
                      }
                      id="guess"
                      /*type="number"*/
                      onChange={guessOnChange}
                      onKeyPress={guessOnKeyPress}
                      value={guessValue}
                      success={guessSuccess}
                      error={guessError}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridContainer justify="center">
                    <GridItem
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      className={classes.textCenter}
                    >
                      <Button
                        color="primary"
                        disabled={guessValue === "" || guessError}
                        onClick={guessSubmit}
                      >
                        Submit
                      </Button>
                    </GridItem>
                    {guessHistory.length > 0 && (
                      <GridItem xs={12} sm={12} md={6} lg={6}>
                        <Button
                          color="primary"
                          /*block*/
                          onClick={() => this.handleClickOpen("classicModal")}
                        >
                          <LibraryBooks className={classes.icon} />
                          Guess History
                        </Button>
                        <Dialog
                          classes={{
                            root: classes.center,
                            paper: classes.modal
                          }}
                          open={this.state.classicModal}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={() => this.handleClose("classicModal")}
                          aria-labelledby="classic-modal-slide-title"
                          aria-describedby="classic-modal-slide-description"
                        >
                          <DialogTitle
                            id="classic-modal-slide-title"
                            disableTypography
                            className={classes.modalHeader}
                          >
                            <IconButton
                              className={classes.modalCloseButton}
                              key="close"
                              aria-label="Close"
                              color="inherit"
                              onClick={() => this.handleClose("classicModal")}
                            >
                              <Close className={classes.modalClose} />
                            </IconButton>
                            <h4 className={classes.modalTitle}>
                              Guess History
                            </h4>
                          </DialogTitle>
                          <DialogContent
                            id="classic-modal-slide-description"
                            className={classes.modalBody}
                          >
                            <div id="sliders">
                              <GridContainer>
                                {guessHistory.map((record, i) => (
                                  <GridItem xs={6} sm={6} md={6} lg={6} key={i}>
                                    <Badge color="primary">
                                      {record.guess}
                                    </Badge>
                                    <Badge
                                      color={
                                        record.result
                                          .toLowerCase()
                                          .includes("small")
                                          ? "warning"
                                          : "danger"
                                      }
                                    >
                                      {record.result}
                                    </Badge>
                                  </GridItem>
                                ))}
                                {/*
                            <div className={classes.typo}>
                              <div className={classes.note}>Header 1</div>
                              <h1>The Life of Material Kit</h1>
                            </div>
                            <div className={classes.typo}>
                              <div className={classes.note}>Header 2</div>
                              <h2>The Life of Material Kit</h2>
                            </div>
                            */}
                              </GridContainer>
                            </div>
                          </DialogContent>
                          <DialogActions className={classes.modalFooter}>
                            <Button
                              onClick={() => this.handleClose("classicModal")}
                              color="danger"
                              simple
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </GridItem>
                    )}
                  </GridContainer>
                </GridContainer>
              </form>
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

InputSection.propTypes = {
  guessOnChange: PropTypes.func,
  guessOnKeyPress: PropTypes.func,
  guessValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  guessSuccess: PropTypes.bool,
  guessError: PropTypes.bool,
  guessMessage: PropTypes.string,
  guessSubmit: PropTypes.func,
  guessHistory: PropTypes.arrayOf(
    PropTypes.shape({
      guess: PropTypes.number,
      result: PropTypes.string
    })
  ),
  won: PropTypes.bool,
  lastGuess: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lastResult: PropTypes.string
};

export default withStyles(inputStyle)(InputSection);
