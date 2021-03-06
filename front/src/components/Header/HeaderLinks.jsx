/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, Assignment, Info } from "@material-ui/icons";
import Person from "@material-ui/icons/Person";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/guess-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
    const { classes, email, logout } = props;
    return (
        <List className={classes.list}>
      { email &&
      <ListItem className={classes.listItem}>
        
          <CustomDropdown
            noLiPadding
            buttonText={email}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Person}
            dropdownList={[
              <a className={classes.dropdownLink} onClick={logout}> Logout</a>
            ]}
          />
        
      </ListItem>
      }
      
        <ListItem className={classes.listItem}>
        <Tooltip
          id="board"
          title="Winner Board"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <Link to="/board" className={classes.navInherit}>
            <i className={classes.socialIcons + " fa fa-users"} />
              </Link>
          </Button>
          
            
        </Tooltip>
        </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="What is Guess 2/3?"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://en.wikipedia.org/wiki/Guess_2/3_of_the_average"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-wikipedia-w"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);