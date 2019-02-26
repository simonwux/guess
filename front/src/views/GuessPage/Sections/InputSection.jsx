import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import inputStyle from "assets/jss/guess-react/views/guessPageSections/inputStyle.jsx";

class InputSection extends React.Component {
  render() {
    const {
      classes,
      guessOnChange,
      guessOnKeyPress,
      guessValue,
      guessSuccess,
      guessError,
      guessMessage,
      guessSubmit
    } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Start your guess below</h2>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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
                    md={4}
                    className={classes.textCenter}
                  >
                    <Button
                      color="primary"
                      disabled={!guessValue || guessError}
                      onClick={guessSubmit}
                    >
                      Submit
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
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
  guessSubmit: PropTypes.func
};

export default withStyles(inputStyle)(InputSection);
