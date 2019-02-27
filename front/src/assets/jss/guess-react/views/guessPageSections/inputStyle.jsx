import modalStyle from "assets/jss/guess-react/modalStyle.jsx";

import { title } from "assets/jss/guess-react.jsx";

import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from "assets/jss/guess-react.jsx";

const inputStyle = {
  section: {
    padding: "70px 0"
  },
  text: {
    color: "#3C4858"
  },
  white: {
    color: "#FFFFFF"
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center"
  },
  description: {
    color: "#999",
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  },
  icon: {
    width: "17px",
    height: "17px",
    marginRight: "4px"
  },
  ...modalStyle,
  label: {
    color: "rgba(0, 0, 0, 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  },
  successText: {
    color: successColor
  },
  link: {
    textDecoration: "none"
  }
};

export default inputStyle;
