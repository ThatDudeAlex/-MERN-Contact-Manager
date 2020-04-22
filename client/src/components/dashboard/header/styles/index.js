import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  header: {
    position: 'fixed',
    zIndex: '1000',
    paddingTop: "7px",
    paddingBottom: "0px",
    marginBottom: "2%",
    backgroundColor: "#1976d2",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.5), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },

  headerItems: {
    // margin: "10px",
    color: "white !important",
  },

  searchBar: {
    backgroundColor: "white",
    color: "black",
  },
  logoutBtn: {
    "&:hover": {
      textDecoration: "underline"
    }
  },

}));
