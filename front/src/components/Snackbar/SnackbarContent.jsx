import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snack from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Close from "@material-ui/icons/Close";

import snackbarContentStyle from "assets/jss/guess-react/components/snackbarContentStyle.jsx";

class SnackbarContent extends React.Component {
  constructor(props) {
    super(props);
    this.closeMessage = this.closeMessage.bind(this);
  }

  closeMessage() {
    this.props.closeMessage();
  }

  render() {
    const { classes, message, color, close, icon } = this.props;
    var action = [];
    if (close !== undefined) {
      action = [
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={this.closeMessage}
        >
          <Close className={classes.close} />
        </IconButton>
      ];
    }

    let snackIcon = null;
    switch (typeof icon) {
      case "function":
        snackIcon = <props.icon className={classes.icon} />;
        break;
      case "string":
        snackIcon = <Icon className={classes.icon}>{this.props.icon}</Icon>;
        break;
      default:
        snackIcon = null;
        break;
    }

    return (
      <Snack
        message={
          <div>
            {snackIcon}
            {message}
            {close !== undefined ? action : null}
          </div>
        }
        classes={{
          root: classes.root + " " + classes[color],
          message: classes.message + " " + classes.container
        }}
      />
    );
  }
}

SnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  closeMessage: PropTypes.func
};

export default withStyles(snackbarContentStyle)(SnackbarContent);
