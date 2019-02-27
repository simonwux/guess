import { container, title } from "assets/jss/guess-react.jsx";

const boardStyle = {
  containerP: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  container,
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  titleP: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative",
    color: "#FFFFFF",
    textAlign: "left"
  },
  subtitleP: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0",
    color: "#FFFFFF",
    textAlign: "left"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  section: {
    padding: "70px 0"
  },
  sharingArea: {
    marginTop: "80px"
  },
  socials: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    fontSize: "20px",
    marginRight: "4px"
  }
};

export default boardStyle;
